// THE CODE IS BASED ON http://blogs.msdn.com/b/davrous/archive/2013/06/13/tutorial-series-learning-how-to-write-a-3d-soft-engine-from-scratch-in-c-typescript-or-javascript.aspx

class Render3dSettings {
    public showTextures = true;
    public showMeshes = false;
    public showFaces = true;
}

class Renderer3d extends Renderer {

    public renderSettings: Render3dSettings = new Render3dSettings();

    public renderer2d: Renderer2d;

    constructor(output: RendererOutput) {
        super(output);
        this.renderer2d = new Renderer2d(output);
    }

    private get_viewProjectionMatrix(camera: Camera) {
        var target = BABYLON.Vector3.from(camera.position);        
        var viewMatrix = BABYLON.Matrix.LookAtLH(camera.position, target.add(camera.direction), camera.up);
        var projectionMatrix = BABYLON.Matrix.PerspectiveFovLH(camera.fov, this.output.width / this.output.height, camera.zNear, camera.zFar);
        return viewMatrix.multiply(projectionMatrix);
    }

    public projectScene(scene: Scene) {

        var viewProjectionMatrix = this.get_viewProjectionMatrix(scene.camera);

        for (var i = 0; i < scene.figures.length; i++) {
             
            var f = scene.figures[i];

            var rotMatrix = BABYLON.Matrix.RotationYawPitchRoll(f.rotation.y, f.rotation.x, f.rotation.z);
            var worldMatrix = rotMatrix.multiply(BABYLON.Matrix.Translation(f.position.x, f.position.y, f.position.z));
            var transformMatrix = worldMatrix.multiply(viewProjectionMatrix);

            f.project(this, worldMatrix, transformMatrix, rotMatrix);
        }
    }

    public projectVector(v: BABYLON.Vector3, transMat: BABYLON.Matrix, pv: BABYLON.Vector3) {    
        BABYLON.Vector3.transformCoordinates(v, transMat, pv);
        pv.x = pv.x * this.output.width + this.output.widthHalf;
        pv.y = -pv.y * this.output.height + this.output.heightHalf;
        pv.z = pv.z;                      
    }

    public projectVertex(vertex: Vertex, transMat: BABYLON.Matrix, worldMat: BABYLON.Matrix, rotMatrix: BABYLON.Matrix, pvertex: Vertex) {

        BABYLON.Vector3.transformCoordinates(vertex.coordinates, worldMat, pvertex.worldCoordinates);
        BABYLON.Vector3.transformCoordinates(vertex.normal, rotMatrix, pvertex.normal);        
        this.projectVector(vertex.coordinates, transMat, pvertex.coordinates);
        pvertex.textureCoordinates = vertex.textureCoordinates;
    }        

    public drawScene(scene: Scene) {

        this.projectScene(scene);

        for (var i = 0; i < scene.figures.length; i++) {
            scene.figures[i].draw(this, scene.light);            
        } 
    }    

    public drawTriangle(v1: Vertex, v2: Vertex, v3: Vertex, color: BABYLON.Color4, light: Light, texture?: Texture): void {
        // Sorting the points in order to always have this order on screen p1, p2 & p3
        // with p1 always up (thus having the Y the lowest possible to be near the top screen)
        // then p2 between p1 & p3
        if (v1.coordinates.y > v2.coordinates.y) {
            var temp = v2;
            v2 = v1;
            v1 = temp;
        }

        if (v2.coordinates.y > v3.coordinates.y) {
            var temp = v2;
            v2 = v3;
            v3 = temp;
        }

        if (v1.coordinates.y > v2.coordinates.y) {
            var temp = v2;
            v2 = v1;
            v1 = temp;
        }

        var p1 = v1.coordinates;
        var p2 = v2.coordinates;
        var p3 = v3.coordinates;
        
        // computing the cos of the angle between the light vector and the normal vector
        // it will return a value between 0 and 1 that will be used as the intensity of the color
        //var ndotl = this.computeNDotL(centerPoint, vnFace, lightPos);
        var nl1 = this.computeNDotL(v1.worldCoordinates, v1.normal, light.position);
        var nl2 = this.computeNDotL(v2.worldCoordinates, v2.normal, light.position);
        var nl3 = this.computeNDotL(v3.worldCoordinates, v3.normal, light.position);

        var data: ScanLineData = {};

        // computing lines' directions
        var dP1P2: number; var dP1P3: number;

        // http://en.wikipedia.org/wiki/Slope
        // Computing slopes
        if (p2.y - p1.y > 0)
            dP1P2 = (p2.x - p1.x) / (p2.y - p1.y);
        else
            dP1P2 = 0;

        if (p3.y - p1.y > 0)
            dP1P3 = (p3.x - p1.x) / (p3.y - p1.y);
        else
            dP1P3 = 0;

        if (dP1P2 > dP1P3) {
            for (var y = Math.max(p1.y >> 0, 0), ye = Math.min(p3.y >> 0, this.output.height); y <= ye; y++) {
                data.currentY = y;

                if (y < p2.y) {
                    data.ndotla = nl1;
                    data.ndotlb = nl3;
                    data.ndotlc = nl1;
                    data.ndotld = nl2;

                    data.ua = v1.textureCoordinates.x;
                    data.ub = v3.textureCoordinates.x;
                    data.uc = v1.textureCoordinates.x;
                    data.ud = v2.textureCoordinates.x;

                    data.va = v1.textureCoordinates.y;
                    data.vb = v3.textureCoordinates.y;
                    data.vc = v1.textureCoordinates.y;
                    data.vd = v2.textureCoordinates.y;

                    this.processScanLine(data, v1, v3, v1, v2, color, texture);
                }
                else {
                    data.ndotla = nl1;
                    data.ndotlb = nl3;
                    data.ndotlc = nl2;
                    data.ndotld = nl3;

                    data.ua = v1.textureCoordinates.x;
                    data.ub = v3.textureCoordinates.x;
                    data.uc = v2.textureCoordinates.x;
                    data.ud = v3.textureCoordinates.x;

                    data.va = v1.textureCoordinates.y;
                    data.vb = v3.textureCoordinates.y;
                    data.vc = v2.textureCoordinates.y;
                    data.vd = v3.textureCoordinates.y;

                    this.processScanLine(data, v1, v3, v2, v3, color, texture);
                }
            }
        }
        else {
            for (var y = Math.max(0, p1.y >> 0), ye = Math.min(this.output.height, p3.y >> 0); y <= ye; y++) {
                data.currentY = y;

                if (y < p2.y) {
                    data.ndotla = nl1;
                    data.ndotlb = nl2;
                    data.ndotlc = nl1;
                    data.ndotld = nl3;

                    data.ua = v1.textureCoordinates.x;
                    data.ub = v2.textureCoordinates.x;
                    data.uc = v1.textureCoordinates.x;
                    data.ud = v3.textureCoordinates.x;

                    data.va = v1.textureCoordinates.y;
                    data.vb = v2.textureCoordinates.y;
                    data.vc = v1.textureCoordinates.y;
                    data.vd = v3.textureCoordinates.y;

                    this.processScanLine(data, v1, v2, v1, v3, color, texture);
                }
                else {
                    data.ndotla = nl2;
                    data.ndotlb = nl3;
                    data.ndotlc = nl1;
                    data.ndotld = nl3;

                    data.ua = v2.textureCoordinates.x;
                    data.ub = v3.textureCoordinates.x;
                    data.uc = v1.textureCoordinates.x;
                    data.ud = v3.textureCoordinates.x;

                    data.va = v2.textureCoordinates.y;
                    data.vb = v3.textureCoordinates.y;
                    data.vc = v1.textureCoordinates.y;
                    data.vd = v3.textureCoordinates.y;

                    this.processScanLine(data, v2, v3, v1, v3, color, texture);
                }
            }
        }
    }

    private clamp(value: number, min: number = 0, max: number = 1): number {
        return Math.max(min, Math.min(value, max));
    }

    private interpolate(min: number, max: number, gradient: number): number {
        return min + (max - min) * this.clamp(gradient);
    }

    // drawing line between 2 points from left to right
    // papb -> pcpd
    // pa, pb, pc, pd must then be sorted before
    private processScanLine(data: ScanLineData, va: Vertex, vb: Vertex, vc: Vertex, vd: Vertex, color: BABYLON.Color4, texture?: Texture): void {
        
        var pa = va.coordinates;
        var pb = vb.coordinates;
        var pc = vc.coordinates;
        var pd = vd.coordinates;

        // Thanks to current Y, we can compute the gradient to compute others values like
        // the starting X (sx) and ending X (ex) to draw between
        // if pa.Y == pb.Y or pc.Y == pd.Y, gradient is forced to 1
        var gradient1 = pa.y != pb.y ? (data.currentY - pa.y) / (pb.y - pa.y) : 1;
        var gradient2 = pc.y != pd.y ? (data.currentY - pc.y) / (pd.y - pc.y) : 1;

        var sx = this.interpolate(pa.x, pb.x, gradient1) >> 0;
        var ex = this.interpolate(pc.x, pd.x, gradient2) >> 0;

        // starting Z & ending Z
        var z1: number = this.interpolate(pa.z, pb.z, gradient1);
        var z2: number = this.interpolate(pc.z, pd.z, gradient2);

        // Interpolating normals on Y
        var snl = this.interpolate(data.ndotla, data.ndotlb, gradient1);
        var enl = this.interpolate(data.ndotlc, data.ndotld, gradient2);

        // Interpolating texture coordinates on Y
        var su = this.interpolate(data.ua, data.ub, gradient1);
        var eu = this.interpolate(data.uc, data.ud, gradient2);
        var sv = this.interpolate(data.va, data.vb, gradient1);
        var ev = this.interpolate(data.vc, data.vd, gradient2);

        // drawing a line from left (sx) to right (ex) 
        for (var x = Math.max(0, sx), exx = Math.min(ex, this.output.width); x < exx; x++) {
            var gradient: number = (x - sx) / (ex - sx);

            // Interpolating Z, normal and texture coordinates on X
            var z = this.interpolate(z1, z2, gradient);
            var ndotl = this.interpolate(snl, enl, gradient);
            var u = this.interpolate(su, eu, gradient);
            var v = this.interpolate(sv, ev, gradient);

            var textureColor = texture ? texture.map(u, v) : BABYLON.Color4.white;

            // changing the native color value using the cosine of the angle
            // between the light vector and the normal vector
            // and the texture color
            this.renderer2d.drawPointC(x, data.currentY, z,
                    color.r * ndotl * textureColor.r * 255,
                    color.g * ndotl * textureColor.g * 255,
                    color.b * ndotl * textureColor.b * 255, 255);
        }
    }

    // Compute the cosine of the angle between the light vector and the normal vector
    // Returns a value between 0 and 1
    private computeNDotL(vertex: BABYLON.Vector3, normal: BABYLON.Vector3, lightPosition: BABYLON.Vector3): number {
        var lightDirection = lightPosition.subtract(vertex);
        lightDirection.normalize();
        return Math.max(0, BABYLON.Vector3.dot(normal, lightDirection));
    }
}