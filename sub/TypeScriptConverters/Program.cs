using System;
using System.IO;

namespace TypeScriptConverters
{
    class Program
    {
        static void Main(string[] args)
        {
            Test();
            ConvertFiles(@"..\..\..\..\", @"java\");
        }

        private static void ConvertFiles(string inputDir, string outputDir)
        {
            foreach (var file in Directory.EnumerateFiles(inputDir, "*.ts", SearchOption.AllDirectories))
            {
                var input = File.ReadAllText(file);
                var inputFileRelPath = file.Substring(inputDir.Length);
                var inputFileRelDir = Path.GetDirectoryName(inputFileRelPath);
                try
                {
                    var output = TypeScriptToJavaConverter.Convert(input);
                    var outputFullDir = outputDir + inputFileRelDir;
                    var outputFile = outputDir + inputFileRelPath;
                    outputFile = Path.ChangeExtension(outputFile, "java");
                    Directory.CreateDirectory(outputFullDir);
                    File.WriteAllText(outputFile, output);
                }
                catch (Exception e)
                {
                    Console.WriteLine("Converting failed for:" + inputFileRelPath);
                    Console.WriteLine("Exception message: " + e.Message);
                    Console.WriteLine();
                }
            }
        }
        

        private static void Test()
        {
            var code =
@"

class A{}

module BABYLON {
    export public static class Color4 extends Color3 implements IColor  {

    arr1: number[] = [];        
    protected handlers: {(EventArgsT): void; }[] = [];
    protected gg = [];

    protected drawFrame() {

            var Objects3dLib = Objects3dLib || {};
       
            var rot = (i, o, n) => {
                var angle = this.rotateAngle * (n + 1);
                if (a > b) {
                    var lambda1 = (x, y) => 5;
                    var lambda2 = (x, y) => { 
                        var z = x * y;
                        return x * z;
                    };
                }
                ImageTransformer.rotate(i, o, angle);
                var cos = Math.cos(angle);
                var sin = Math.sin(angle);
                c.x = c.x * cos - c.y * sin >> 0;
                c.y = c.x * sin + c.y * cos >> 0;
            };

            var scl = (i, o, n) => {
                var s = 0.2 * (n + 1);
                ImageTransformer.scale(i, o, s, s,(o.width - i.width * s) / 2,(o.height - i.height * s) / 2);
                c = co.scale(s);
            };
            
            
            for (var i = 0; i < 10; i++) {
                this.transImage1.clear();
                this.transImage2.clear();
                scl(this.image, this.transImage1, i);
                rot(this.transImage1, this.transImage2, i);
                this.renderer2d.drawImage(this.transImage2, this.imagePos.x + c.x, this.imagePos.y + c.y, this.imagePos.z, this.imageScaley, this.imageScaley);
            }
        }
        
        // Working with a fix sized texture (512x512, 1024x1024, etc.). 
        /* comment
         *
         *
        */     
        protected onStart(continuation: () => () => any, optional?: Function = null): () => () => any {
            continuation();
        }

        arr2 = [];
        arr3: BABYLON.Color4[];

        public static white = new BABYLON.Color4(1, 1, 1, 1);
        public static black = new Color4(0, 0, 0, 1);
        
        r: number;
        g: number;
        private b: number;
        a: number;
        protected d: number = 4;
        di = 4;
        e = -3.34;
        ep = 3.34;
        s = ""hi"";
        s2 = 'hi-hi';
        
        b = true;
        b2 = false;

        constructor(initialR: number, initialG: number, initialB: number, initialA: number) {
            super(a, b, c);
            this.r = initialR;
            this.g = initialG;
            this.b = initialB;
            this.a = initialA;
        }

        public static toString(a: number, b, c: BABYLON.Color4 = null, d=8): string {
            super.toString();
            return ""{R: "" + this.r + "" G:"" + this.g + "" B:"" + this.b + "" A:"" + this.a + ""}"";
        }

        public static toVoid(a: number, b, c: BABYLON.Color4 = new BABYLON.Color(1, 1, 1, 1), d=8) {
            var i = 0, k = 3;
            var a = b;
            var d = 3 + 5;
            var e = (3 + 3); 
            var f = -3.4;
            var g = 3.4;
            if (i == 3){
                for (var i = 3; i < 4; i++){
                    for (var j = 0.3; j < 1.0; j += 0.1){
                    }
                }
            }
        }        
             
    }

    class C {
        public f(): number { return 0; }
    }
}

class B {
    public f(): number { return 0; }
}   ";

            var r = TypeScriptToJavaConverter.Convert(code);
        }
    }
}
