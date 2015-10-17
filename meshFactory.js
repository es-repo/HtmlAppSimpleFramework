// THE CODE IS BASED ON http://blogs.msdn.com/b/davrous/archive/2013/06/13/tutorial-series-learning-how-to-write-a-3d-soft-engine-from-scratch-in-c-typescript-or-javascript.aspx
var MeshFactory = (function () {
    function MeshFactory() {
    }
    MeshFactory.loadFromBabylonJsonFileAsync = function (fileName, callback) {
        var jsonObject = {};
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", fileName, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                jsonObject = JSON.parse(xmlhttp.responseText);
                var meshes = MeshFactory.createFromBabylonData(jsonObject);
                callback(meshes);
            }
        };
        xmlhttp.send(null);
    };
    MeshFactory.createFromBabylonData = function (babylonData, loadTextures) {
        if (loadTextures === void 0) { loadTextures = true; }
        var meshes = [];
        var materials = [];
        for (var materialIndex = 0; materialIndex < babylonData.materials.length; materialIndex++) {
            var material = {};
            material.Name = babylonData.materials[materialIndex].name;
            material.ID = babylonData.materials[materialIndex].id;
            if (babylonData.materials[materialIndex].diffuseTexture)
                material.DiffuseTextureName = babylonData.materials[materialIndex].diffuseTexture.name;
            materials[material.ID] = material;
        }
        for (var meshIndex = 0; meshIndex < babylonData.meshes.length; meshIndex++) {
            var verticesArray = babylonData.meshes[meshIndex].vertices;
            // Faces
            var indicesArray = babylonData.meshes[meshIndex].indices;
            var uvCount = babylonData.meshes[meshIndex].uvCount;
            var verticesStep = 1;
            // Depending of the number of texture's coordinates per vertex
            // we're jumping in the vertices array  by 6, 8 & 10 windows frame
            switch (uvCount) {
                case 0:
                    verticesStep = 6;
                    break;
                case 1:
                    verticesStep = 8;
                    break;
                case 2:
                    verticesStep = 10;
                    break;
            }
            // the number of interesting vertices information for us
            var verticesCount = verticesArray.length / verticesStep;
            // number of faces is logically the size of the array divided by 3 (A, B, C)
            var facesCount = indicesArray.length / 3;
            var mesh = new Mesh(verticesCount, facesCount);
            // Filling the Vertices array of our mesh first
            for (var index = 0; index < verticesCount; index++) {
                var x = verticesArray[index * verticesStep];
                var y = verticesArray[index * verticesStep + 1];
                var z = verticesArray[index * verticesStep + 2];
                // Loading the vertex normal exported by Blender
                var nx = verticesArray[index * verticesStep + 3];
                var ny = verticesArray[index * verticesStep + 4];
                var nz = verticesArray[index * verticesStep + 5];
                mesh.vertices[index] = {
                    coordinates: new BABYLON.Vector3(x, y, z),
                    normal: new BABYLON.Vector3(nx, ny, nz)
                };
                if (uvCount > 0) {
                    // Loading the texture coordinates
                    var u = verticesArray[index * verticesStep + 6];
                    var v = verticesArray[index * verticesStep + 7];
                    mesh.vertices[index].textureCoordinates = new BABYLON.Vector2(u, v);
                }
                else {
                    mesh.vertices[index].textureCoordinates = new BABYLON.Vector2(0, 0);
                }
            }
            // Then filling the Faces array
            for (var index = 0; index < facesCount; index++) {
                var a = indicesArray[index * 3];
                var b = indicesArray[index * 3 + 1];
                var c = indicesArray[index * 3 + 2];
                mesh.faces[index] = {
                    a: a,
                    b: b,
                    c: c
                };
            }
            // Getting the position you've set in Blender
            var position = babylonData.meshes[meshIndex].position;
            mesh.position = new BABYLON.Vector3(position[0], position[1], position[2]);
            if (uvCount > 0) {
                var meshTextureID = babylonData.meshes[meshIndex].materialId;
                var meshTextureName = materials[meshTextureID].DiffuseTextureName;
                mesh.texture = new Texture(512, 512);
                if (loadTextures)
                    mesh.texture.load(meshTextureName.toString());
            }
            meshes.push(mesh);
        }
        return meshes;
    };
    MeshFactory.createFromBabylonAndTextureBase64Data = function (json) {
        var meshes = MeshFactory.createFromBabylonData(json.babylonData, false);
        for (var i = 0; i < meshes.length; i++) {
            meshes[i].texture.load(json.textureBase64Data);
        }
        return meshes;
    };
    return MeshFactory;
})();
