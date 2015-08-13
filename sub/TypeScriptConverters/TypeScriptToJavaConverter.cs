using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

public class TypeScriptToJavaConverter
{
    private static char[] operatorsAndSymbols =
        {
            '+', '-', '/', '*', '=', 
            '{', '}', '(', ')', '[', ']', '<',  '>',
            '.', '!', '?', ';', ',',  ':',
            '|'
        };

    private static Regex tokenizeRegex;
    private static Regex doubleRegex = new Regex(@"^-?\d*(\.\d+)?$", RegexOptions.Compiled);
    private static Regex integerRegex = new Regex(@"^-?\d+$", RegexOptions.Compiled);

    static TypeScriptToJavaConverter()
    {
        var os = string.Join(@"|\", operatorsAndSymbols);
        tokenizeRegex = new Regex(@"([\s\\]+)|(\""[^\""]*\"")|('[^']*')|([\w]+)|(\" + os + ")", RegexOptions.Compiled);
    }

    public static string[] Tokenize(string code)
    {
        var r = tokenizeRegex.Matches(code);
        return r.Cast<Match>().Select(m => m.Value).ToArray();
    }

    public static string Convert(string code)
    {
        var tokens = Tokenize(code);
        var r = new StringBuilder();
        int i = 0;
        var inModule = false;
        while (true)
        {
            i = FlushWhiteSpaces(tokens, i, r);
            if (i == tokens.Length)
                break;

            var t = tokens[i];

            if (t == "module")
            {
                r.Append("package");
                i = FlushWhiteSpaces(tokens, i + 1, r);
                r.Append(tokens[i] + ";\r\n\r\n"); // module name;
                i = OmitWhiteSpaces(tokens, i + 1);
                i = FlushWhiteSpaces(tokens, i + 1 /* omit { */, r);
                inModule = true;
            }

            if (IsComment(tokens, i))
            {
                i = ConvertComment(tokens, i, r);
            }
            else
            {
                i = ConvertClass(tokens, i, r);
            }

            if (inModule)
            {
                var j = i;
                j = OmitWhiteSpaces(tokens, j);
                if (tokens[j] == "}")
                {
                    // the module end
                    i = j + 1;
                    inModule = false;
                }
            }
        }

        // TODO: replace single quotes to doubles
        // TODO: reduce tabs if there is a module definition
        return r.ToString();
    }

    public static int ConvertClass(string[] tokens, int i, StringBuilder r)
    {
        string t = tokens[i];

        if (t == "export")
        {
            i = OmitWhiteSpaces(tokens, i + 1);
        }

        i = ConvertAccessLevelModifierAndStatic(tokens, i, r);
        i = FlushWhiteSpaces(tokens, i, r);
        t = tokens[i];

        r.Append(t); // class
        i = FlushWhiteSpaces(tokens, i + 1, r);
        string className = tokens[i];
        r.Append(className);
        i++;
        t = tokens[i];
        while (t != "{")
        {
            r.Append(t);
            i++;
            t = tokens[i];
        }

        return ConvertClassBody(className, tokens, i, r);
    }

    public static int ConvertClassBody(string className, string[] tokens, int i, StringBuilder r)
    {
        var t = tokens[i];
        r.Append(t); // {
        i++;

        while (t != "}")
        {
            i = FlushWhiteSpaces(tokens, i, r);

            if (IsComment(tokens, i))
            {
                i = ConvertComment(tokens, i, r);
            }
            else if (IsField(tokens, i))
            {
                i = ConvertField(tokens, i, r);
            }
            else if (IsMethod(tokens, i))
            {
                i = ConvertMethod(tokens, i, r, className);
            }

            t = tokens[i];
        }
        r.Append(t); // }
        return i + 1;
    }

    private static bool IsComment(string[] tokens, int i)
    {
        return tokens[i] == "/" && (tokens[i + 1] == "/" || tokens[i + 1] == "*");
    }

    private static int ConvertComment(string[] tokens, int i, StringBuilder r)
    {
        if (tokens[i + 1] == "/")
        {
            i += 2;
            var t = tokens[i];
            r.Append("//");
            while (i < tokens.Length && !t.Contains("\r\n"))
            {
                i++;
                r.Append(t);
                t = tokens[i];
            }
        }
        else if (tokens[i + 1] == "*")
        {
            i += 2;
            var t = tokens[i];
            var t2 = tokens[i + 1];
            r.Append("/*");
            while (t != "*" || t2 != "/")
            {
                i++;
                r.Append(t);
                t = tokens[i];
                t2 = tokens[i + 1];
            }
            r.Append("*/");
            i += 2;
        }
        return i;
    }

    private static bool IsField(string[] tokens, int i)
    {
        while (i < tokens.Length)
        {
            var t = tokens[i];
            if (t == "{" || t == "(" || t == "}")
                return false;

            if (t == ";" || t == ":" || t == "=")
                return true;

            i++;
        }

        return false;
    }

    public static int ConvertField(string[] tokens, int i, StringBuilder r)
    {
        i = ConvertAccessLevelModifierAndStatic(tokens, i, r);
        return ConvertVariableDeclaration(tokens, i, r);
    }

    private static int ConvertAccessLevelModifierAndStatic(string[] tokens, int i, StringBuilder r)
    {
        var t = tokens[i];
        if (IsAccessLevelModifier(t))
        {
            r.Append(t);
            i = FlushWhiteSpaces(tokens, i + 1, r);
            t = tokens[i];
        }

        if (t == "static")
        {
            r.Append(t);
            i = FlushWhiteSpaces(tokens, i + 1, r);
        }
        return i;
    }

    private static int ConvertVariableDeclaration(string[] tokens, int i, StringBuilder r)
    {
        var t = tokens[i];
        int nameIndex = r.Length;
        r.Append(t); // name

        if (tokens[i + 1] == "?") // omit optional parameter sign
            i++;

        i = FlushWhiteSpaces(tokens, i + 1, r);

        var type = "Object";
        t = tokens[i];

        if (t == ":")
        {
            i = OmitWhiteSpaces(tokens, i + 1);
            i = ReadType(tokens, i, ref type);
        }
        else if (t == "=")
        {
            var j = OmitWhiteSpaces(tokens, i + 1);

            if (tokens[j] == "new")
            {
                j = OmitWhiteSpaces(tokens, j + 1);
                ReadType(tokens, j, ref type);
            }
            else
            {
                type = InferTypeByValueExpr(tokens, j);
            }
        }

        r.Insert(nameIndex, type + " ");

        i = FlushWhiteSpaces(tokens, i, r);
        t = tokens[i];
        var level = 0;
        while (!((t == ";" || t == "," || t == ")") && level == 0))
        {
            if (t == "(")
                level++;
            else if (t == ")" && level > 0)
                level--;

            else if (t == "{") // is lambda
            {
                i = ConvertMethodBody(tokens, i, r);
                t = tokens[i];
                continue;
            }

            r.Append(t);
            i++;
            t = tokens[i];
        }
        if (t != ")")
        {
            r.Append(t);
            i++;
        }

        return i;
    }

    private static string ConvertType(string type)
    {
        switch (type)
        {
            case "number":
                return "double";

            case "string":
                return "String";

            case "any":
                return "object";

            default: return type;
        }
    }

    private static string InferTypeByValueExpr(string[] tokens, int i)
    {
        var t = tokens[i];
        var t2 = tokens[i + 1];
        if (t[0] == '\"' || t[0] == '\'')
            return "String";

        if (integerRegex.IsMatch(t) || (t == "-" && integerRegex.IsMatch(t2)))
        {
            var t3 = tokens[i + 2];
            return t2 == "." || t3 == "." ? "double" : "int";
        }

        if (t == "true" || t == "false")
            return "boolean";

        if (t == "[" && t2 == "]")
            return "Object[]";

        return "Object";
    }

    private static bool IsAccessLevelModifier(string t)
    {
        return t == "public" || t == "protected" || t == "private";
    }

    private static int ReadType(string[] tokens, int i, ref string type)
    {
        var t = tokens[i];

        if (t == "(") // is lambda type
        {
            var level = 1;
            while (t != ")" || level > 1)
            {
                i++;
                t = tokens[i];
                if (t == "(")
                    level++;
                if (t == ")")
                    level--;
            }
            while (t != ">")
            {
                i++;
                t = tokens[i];
            }
            i = OmitWhiteSpaces(tokens, i + 1);
            var returnType = "";
            i = ReadType(tokens, i, ref returnType);
            type = "Object";
        }
        else if (t == "{") // is array of lambda type in field declaration
        {
            while (t != "}")
            {
                t = tokens[++i];
            }
            i++;
            type = "Object";
        }
        else
        {
            var r = new StringBuilder();
            r.Append(t);
            i++;
            t = tokens[i];
            while (t == ".")
            {
                r.Append(t);
                i++;
                t = tokens[i];
                r.Append(t);
                i++;
                t = tokens[i];
            }
            type = r.ToString();
        }

        type = ConvertType(type);
        if (tokens[i] == "[")
        {
            type += "[]";
            i += 2;
        }
        return i;
    }

    private static bool IsMethod(string[] tokens, int i)
    {
        while (i < tokens.Length)
        {
            if (tokens[i] == ";")
                return false;
            if (tokens[i] == "{")
                return true;
            if (tokens[i] == "}")
                return false;
            i++;
        }
        return false;
    }

    public static int ConvertMethod(string[] tokens, int i, StringBuilder r, string className)
    {
        i = ConvertAccessLevelModifierAndStatic(tokens, i, r);
        var methodName = tokens[i];

        var isConstructor = methodName == "constructor";
        if (isConstructor)
            methodName = className;

        int nameIndex = r.Length;
        r.Append(methodName); // name
        i = FlushWhiteSpaces(tokens, i + 1, r);

        var t = tokens[i];
        r.Append(t); // (
        i++;

        while (t != ")")
        {
            i = FlushWhiteSpaces(tokens, i, r);
            t = tokens[i];
            if (t != ")")
                i = ConvertVariableDeclaration(tokens, i, r);
        }
        r.Append(t); // ) args end

        i = FlushWhiteSpaces(tokens, i + 1, r);
        var returnType = "void";
        if (tokens[i] == ":")
        {
            i = OmitWhiteSpaces(tokens, i + 1);
            i = ReadType(tokens, i, ref returnType);
        }

        if (!isConstructor)
            r.Insert(nameIndex, returnType + " ");
        i = FlushWhiteSpaces(tokens, i, r);
        return ConvertMethodBody(tokens, i, r);
    }

    private static int ConvertMethodBody(string[] tokens, int i, StringBuilder r)
    {
        var t = tokens[i];
        r.Append(t); // {
        i++;
        int level = 1;
        while (level > 0)
        {
            t = tokens[i];
            if (t == "var")
            {
                i = OmitWhiteSpaces(tokens, i + 1);
                i = ConvertVariableDeclaration(tokens, i, r);
            }
            else
            {
                r.Append(t);
                if (t == "{")
                    level++;
                else if (t == "}")
                    level--;
                i++;
            }
        }
        return i;
    }

    private static int FlushWhiteSpaces(string[] tokens, int i, StringBuilder r)
    {
        while (i < tokens.Length && string.IsNullOrWhiteSpace(tokens[i]))
        {
            r.Append(tokens[i]);
            i++;
        }
        return i;
    }

    private static int OmitWhiteSpaces(string[] tokens, int i)
    {
        while (string.IsNullOrWhiteSpace(tokens[i]))
        {
            i++;
        }
        return i;
    }
}