

import * as THREE from '../../build/three.module.js';
var Objects3d = {};

Objects3d = (function(){

    var Return = {

        //创建自定义几何
        createCustomizeGEO: function(points , XLength , YLength , ZLength , signUVs=true)
        {
            var geo = new THREE.Geometry();
            var bx = XLength;
            var by = YLength;
            var bz = ZLength;

            var vertices = [];
            var faces = [];

            for(var i = 0 ; i < points.length ; i ++)
                vertices.push( new THREE.Vector3( points[i][0] * bx , points[i][1] * by , points[i][2] * bz ) );
            for(var i = 0 ; i < points.length-3 ; i += 4)
            {
                faces.push(new THREE.Face3( i , i + 1 , i + 2 ));
                faces.push(new THREE.Face3( i + 2 , i + 3 , i ));
            }
            geo.vertices = vertices;
            geo.faces = faces;
            if(signUVs)
                this.assignUVs(geo);
            return geo;
        } ,

        //注册UV贴图
        assignUVs : function(geo)
        {
            geo.computeFaceNormals();
            geo.computeBoundingBox();      //生成法向量
            var max = geo.boundingBox.max,
                min = geo.boundingBox.min;
            var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
            var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
            var faces = geo.faces;
            geo.faceVertexUvs[0] = [];
            for (var i = 0; i < faces.length ; i++) {
                var v1 = geo.vertices[faces[i].a],
                    v2 = geo.vertices[faces[i].b],
                    v3 = geo.vertices[faces[i].c];
                geo.faceVertexUvs[0].push([
                    new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
                    new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
                    new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
                ]);
            }
            geo.uvsNeedUpdate = true;
        }


    }
    return Return;
})();

export { Objects3d }