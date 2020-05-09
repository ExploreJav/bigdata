


import * as THREE from '../build/three.module.js';
import Stats from './jsm/libs/stats.module.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { FBXLoader } from './jsm/loaders/FBXLoader.js';
import { Datas } from './Datas.js';
import { Objects3d } from './3d/Objects3d.js';
import { CinematicCamera } from './jsm/cameras/CinematicCamera.js';
import { TWEEN } from './js/Tween.js';
//import {Vector3} from "../build/three.module";

//import * as dat from './js/libs/dat.gui.min.js';
//import GUI, { DatBoolean, DatColor, DatNumber, DatString } from './js/libs/GUI.js';


var MapChina3d = function()
{

    var _loadOutMeshConfig = [ { url : "./models/chongqingMap.FBX" } ,
        { url : "./models/chinaMap.FBX" }
    ];
    var _rotationPlanesConfig = [
        { position : [0 , 1.0 , 0] , textureDir : "./material/circle0.png" , planeSize : [4 , 4] , opacity : .6 , rotateSpeed : 0.01 , mesh : null } ,
        { position : [0 , 0.95 ,0] , textureDir : "./material/circle1.png" , planeSize : [4.6 , 4.6] , opacity : .15 , rotateSpeed : -0.005 , mesh : null } ,
        { position : [0 , 1.2 ,0] , textureDir : "./material/circle2.png" , planeSize : [9 , 9] , opacity : .5 , rotateSpeed : 0.002 , mesh : null }
    ];

    var _cistrictNames = [
        { en : "yubei" , cn : "渝北",totalapplications:999,totalLength:100435} ,
        { en : "yuzhong" , cn : "渝中",totalapplications:999,totalLength:100435} ,
        { en : "wansheng" , cn : "万盛" ,totalapplications:123,totalLength:456} ,
        { en : "banan" , cn : "巴南",totalapplications:123,totalLength:456} ,
        { en : "changshou" , cn : "长寿",totalapplications:123,totalLength:456} ,
        { en : "fengdu" , cn : "丰都",totalapplications:123,totalLength:456} ,
        { en : "kaixian" , cn : "开县",totalapplications:123,totalLength:456} ,
        { en : "youyang" , cn : "酉阳",totalapplications:123,totalLength:456} ,
        { en : "qianjiang" , cn : "黔江",totalapplications:123,totalLength:456} ,
        { en : "fuling" , cn : "涪陵",totalapplications:123,totalLength:456} ,
        { en : "liangping" , cn : "梁平",totalapplications:123,totalLength:456} ,
        { en : "pengshui" , cn : "彭水",totalapplications:123,totalLength:456} ,
        { en : "zhongxian" , cn : "忠县",totalapplications:123,totalLength:456} ,
        { en : "wanzhou" , cn : "万州",totalapplications:123,totalLength:456} ,
        { en : "shizhu" , cn : "石柱",totalapplications:123,totalLength:456} ,
        { en : "dianjiang" , cn : "垫江",totalapplications:123,totalLength:456} ,
        { en : "rongchang" , cn : "荣昌",totalapplications:123,totalLength:456} ,
        { en : "nanchuan" , cn : "南川",totalapplications:123,totalLength:456} ,
        { en : "wulong" , cn : "武隆",totalapplications:123,totalLength:456} ,
        { en : "yunyang" , cn : "云阳",totalapplications:123,totalLength:456} ,
        { en : "wuxi" , cn : "巫溪",totalapplications:123,totalLength:456} ,
        { en : "hechuan" , cn : "合川",totalapplications:123,totalLength:456} ,
        { en : "dazu" , cn : "大足",totalapplications:123,totalLength:456} ,
        { en : "xiushan" , cn : "秀山",totalapplications:123,totalLength:456} ,
        { en : "fengjie" , cn : "奉节",totalapplications:123,totalLength:456} ,
        { en : "wushan" , cn : "巫山",totalapplications:123,totalLength:456} ,
        { en : "jiulongpo" , cn : "九龙坡" ,totalapplications:123,totalLength:456} ,
        { en : "shapingba" , cn : "沙坪坝" ,totalapplications:123,totalLength:456} ,
        { en : "tongliang" , cn : "铜梁",totalapplications:123,totalLength:456 } ,
        { en : "tongnan" , cn : "潼南" ,totalapplications:123,totalLength:456} ,
        { en : "bishan" , cn : "璧山" ,totalapplications:123,totalLength:456} ,
        { en : "dadukou" , cn : "大渡口" ,totalapplications:123,totalLength:456} ,
        { en : "jiangjin" , cn : "江津",totalapplications:123,totalLength:456 } ,
        { en : "yongchuan" , cn : "永川",totalapplications:123,totalLength:456 } ,
        { en : "beibei" , cn : "北碚",totalapplications:123,totalLength:456 } ,
        { en : "nanan" , cn : "南岸",totalapplications:123,totalLength:456 } ,
        { en : "jiangbei" , cn : "江北" ,totalapplications:123,totalLength:456} ,
        { en : "qijiang" , cn : "綦江",totalapplications:123,totalLength:456 } ,
        { en : "chengkou" , cn : "城口" ,totalapplications:123,totalLength:456}
    ];

    var _meshFaceProvince = [];
    var _spriteLabels = [];

    var _materialMapDefualt;            //地图材质 默认
    var _materialMapOnSelected;        //地图材质当处于选中状态时

    var _container , _document , _gui;
    var _this = this;
    var _scene,_camera,_renderer,_controls , _stats;

    var _saveCameraLookAt = new THREE.Vector3(0,0,0);
    var _tweens = [];

    var _cubeCamera;

    var _lights = [];
    var _objects = [];
    var _loadMeshList = [];      //加载模型列表
    var _guiData;

    var _viewAround = false;     //围绕中心旋转观看
    var _material;
    var _material2;
    var _material3;
    var _material4;
    var _material5;
    var _material6;
    var _line;
    var _ballMoveOnLine;

    var _rotation = 0;
    var _offsetX = -10;
    var _offsetX2 = -10;
    var _offsetX3 = -10;
    var _offsetX4 = -10;
    var _offsetX5 = -10;
    var _offsetX6 = 100;
    var _offsetSpeed = 0.1;
    var _progress = 0.1;

    //var _mapWholeColor = 0x1c1827;
    var _mapWholeColor = 0x101420;
    //var _mapWholeColor = 0x031812

    var camera, scene, renderer, controls, stats;
    var target1, postScene1, postCamera1, postMaterial1;
    var target2, postScene2, postCamera2, postMaterial2;
    var supportsExtension = true;
    var config = {focalDepth: 1.2};

    var _blurEffect = false;        //启用景深效果
    var _blurCatchLayer = false;     //景深是否分层


    this.init2 = function()
    {
        console.log("MapChina3d init...");

        _document = document;
        _gui = Datas._gui;
        _container = _document.createElement( 'canvas' );
        _document.body.appendChild( _container );

        _scene = new THREE.Scene();
        _scene.background = new THREE.Color( 0x0f1421 );
        _scene.fog = new THREE.Fog( 0x0f1421 , 5 , 15 );

        _camera = new THREE.PerspectiveCamera( 50, 3000 / 1200, 0.1, 100 );
        //_camera = new CinematicCamera(120, window.innerWidth / window.innerHeight, 1, 1000);
        //_camera.setLens(10 , 10, 10, 10);
        _camera.position.set( 0, 6 , 0.5 );
        _saveCameraLookAt = new THREE.Vector3(-1,0,0);
        _camera.lookAt(_saveCameraLookAt);
       
        //_camera.autoRotateSpeed = 2;
        //_camera.autoRotate = true;

        var gridHelper = new THREE.GridHelper( 500, 20 );

        //_scene.add( _camera );
        //_scene.add( gridHelper );

        _renderer = new THREE.WebGLRenderer( { canvas : _container , antialias: false , logarithmicDepthBuffer: _blurCatchLayer } );
        _renderer.setPixelRatio( window.devicePixelRatio );
        // _renderer.setSize( window.innerWidth, window.innerHeight );
        _renderer.setSize( 3000, 1200 );
        _renderer.shadowMap.enabled = true;
        _renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        _renderer.sortObjects = true;
        //_container.appendChild( _renderer.domElement );





        _controls = new OrbitControls( _camera, _renderer.domElement );
        //_controls.addEventListener( 'change', render );
        _controls.minDistance = 2;
        _controls.maxDistance = 500;
        _controls.enablePan = true;

        _stats = new Stats();
        //_document.body.appendChild( _stats.dom );



        this.nextLoadMisson();
    }

    this.initBlurEffect = function()
    {
        // Create a multi render target with Float buffers
        target1 = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
        target1.texture.format = THREE.RGBFormat;
        target1.texture.minFilter = THREE.NearestFilter;
        target1.texture.magFilter = THREE.NearestFilter;
        target1.texture.generateMipmaps = false;
        target1.stencilBuffer = false;
        target1.depthBuffer = true;
        target1.depthTexture = new THREE.DepthTexture();
        target1.depthTexture.type = THREE.UnsignedShortType;

        target2 = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
        target2.texture.format = THREE.RGBAFormat;
        target2.texture.minFilter = THREE.NearestFilter;
        target2.texture.magFilter = THREE.NearestFilter;
        target2.texture.generateMipmaps = false;
        target2.stencilBuffer = false;
        target2.depthBuffer = false;

        // Setup post processing stage
        postCamera1 = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
        postMaterial1 = new THREE.ShaderMaterial( {
            vertexShader: document.querySelector( '#post-vert-1' ).textContent.trim(),
            fragmentShader: document.querySelector( '#post-frag-1' ).textContent.trim(),
            uniforms: {
                cameraNear: { value: _camera.near },
                cameraFar: { value: _camera.far },
                focalDepth: {value: config.focalDepth},
                farStart: {value: 2.0},
                farRange: {value: 3.0},
                nearStart: {value: 1.0},
                nearRange: {value: 0.7},
                tColor: { value: target1.texture },
                tDepth: { value: target1.depthTexture },
                textureWidth: {value: window.innerWidth},
                textureHeight: {value: window.innerHeight}
            }
        } );
        var postPlane = new THREE.PlaneBufferGeometry( 2, 2 );
        var postQuad = new THREE.Mesh( postPlane, postMaterial1 );
        postScene1 = new THREE.Scene();
        postScene1.add( postQuad );

        postCamera2 = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
        postMaterial2 = new THREE.ShaderMaterial( {
            vertexShader: document.querySelector( '#post-vert-2' ).textContent.trim(),
            fragmentShader: document.querySelector( '#post-frag-2' ).textContent.trim(),
            uniforms: {
                tColor: { value: target2.texture },
                textureWidth: {value: window.innerWidth},
                textureHeight: {value: window.innerHeight},
            }
        } );
        var postPlane = new THREE.PlaneBufferGeometry( 2, 2 );
        var postQuad = new THREE.Mesh( postPlane, postMaterial2 );
        postScene2 = new THREE.Scene();
        postScene2.add( postQuad );

    }


    this.createTrack = function(THREE,start,end){
        let points=[]
        var material = new THREE.LineBasicMaterial({
            color: 0xff0000
        });
        var geometry = new THREE.BufferGeometry();
        points.push(start);
        points.push(end);
        geometry.setFromPoints(points)

        var line = new THREE.Line( geometry, material );
        userMeshGroup.add(line)
        viewer3D.render();
        this.addPiont=function(x,y,z){
            points.push(new THREE.Vector3(x,y,z));
            line.geometry.setFromPoints(points)
            viewer3D.render();
        }
    }

    this.loadTestMesh = function(url , successCallBack=null , errorCallBack=null)
    {
        var loader = new FBXLoader();
        loader.load( url ,
            function ( object )
            {

                //console.log("_configLength: " + _loadOutMeshConfig.length)
                console.log("object: " );
                console.log(object)

                var mtr1 = new THREE.MeshPhongMaterial({
                    color : _mapWholeColor ,
                    //shading : THREE.SmoothShading ,
                    fog : true ,
                    transparent : true ,
                    opacity: 0.7 ,
                    side : THREE.DoubleSide ,
                    //shadowSide: THREE.BackSide ,
                    polygonOffsetFactor : 0.5,
                    polygonOffsetUnits : 1.0 ,
                    polygonOffset: true ,

                    specular : 0x6677a8 ,
                    shininess : 0 ,

                    alphaTest : .1
                    //alphaTest : 0.2 ,
                    //depthTest: false
                })

                var mtr2 = new THREE.MeshPhysicalMaterial({
                    color: 0xffffff ,
                    //emissive:0xffffff,// emissive默认黑色，设置为白色
                    //emissiveMap: texLoader.load("./material/Mars_MGS_colorhillshade_mola_1024.jpg"),
                    //emissiveIntensity: 1

                    alphaTest : .1
                })

                var mtr3 = new THREE.MeshPhongMaterial({
                    color: _mapWholeColor ,
                    //emissive: 0x31518c,// emissive默认黑色，设置为白色
                    //emissiveMap: texLoader.load("./material/Mars_MGS_colorhillshade_mola_1024.jpg"),
                    //emissiveIntensity: 1

                    alphaTest : .1
                })

                var txtr = new THREE.TextureLoader().load("./material/mapStar.jpg");
                var mtr35 = new THREE.MeshPhongMaterial({
                    color: _mapWholeColor ,
                    map : txtr ,
                    //emissive: 0x31518c,// emissive默认黑色，设置为白色
                    //emissiveMap: texLoader.load("./material/Mars_MGS_colorhillshade_mola_1024.jpg"),
                    //emissiveIntensity: 1

                    alphaTest : .1
                })

                var txtr = new THREE.TextureLoader().load("./material/pointLine1.png");
                txtr.matrixAutoUpdate = false; // 设置纹理属性matrixAutoUpdate为false以后，纹理将通过matrix属性设置的矩阵更新纹理显示
                txtr.wrapS = txtr.wrapT = THREE.RepeatWrapping; //设置为可循环
                //txtr.wrapS = txtr.wrapT = THREE.ClampToEdgeWrapping; //设置会默认的最后一像素伸展
                txtr.needsUpdate = true;
                var mtr4 = new THREE.MeshPhysicalMaterial({
                    color: 0x0d131f ,
                    map : txtr ,
                    emissive: 0x0d131f ,// emissive默认黑色，设置为白色
                    emissiveMap: txtr ,
                    emissiveIntensity: 3.5 ,
                    alphaTest : .1
                })

                var txtr1 = new THREE.TextureLoader().load("./material/cqjpg1.jpg");
                var mtr5 = new THREE.MeshPhongMaterial({
                    color: 0x555555 ,
                    map : txtr1 ,
                    shininess : 10 ,
                    alphaTest : .1
                })

                var mtr6 = new THREE.MeshPhysicalMaterial({
                    color: 0x575757 ,
                    map : txtr1 ,
                    transparent : 1 ,
                    opacity : 1 ,
                    alphaTest : .1
                })
                mtr6.needsUpdate = true;

                _materialMapDefualt = mtr5;
                _materialMapOnSelected = mtr6;

                for(var i = 0 ; i < object.children.length ; i ++)
                {
                    if(_loadOutMeshConfig.length == 2)
                    {
                        if(object.children[i].name == "bottom_chongqing")
                        {
                            object.children[i].material = mtr4;
                            console.log(object.children[i])
                            continue;
                        }
                        if(object.children[i].name.indexOf("line_") == -1)
                        {
                            object.children[i].material = mtr5;
                            _meshFaceProvince.push( object.children[i] );
                        }
                        else
                            object.children[i].material = mtr2;
                    }
                    else if(_loadOutMeshConfig.length == 1)
                    {
                        if(object.children[i].name.indexOf("line_") == -1)
                            object.children[i].material = mtr1;
                        else
                            object.children[i].material = mtr3;
                            //object.children[i].material = mtr35;
                    }

                    object.traverse( function ( child ) {
                        if ( child.isMesh ) {
                            object.children[i].castShadow = true;
                            object.children[i].receiveShadow = true;
                        }
                    })
                    //object.renderOrder = i;
                }


                _objects.push(object);
                _loadOutMeshConfig.shift();
                _this.nextLoadMisson();

            } ,
            function()
            {

            } ,
            function()
            {
                _loadOutMeshConfig.shift();
                _this.nextLoadMisson();
            });
    }

    this.nextLoadMisson = function()
    {
        //console.log("nextLoadMisson....")
        if(_loadOutMeshConfig.length > 0)
            _this.loadTestMesh(_loadOutMeshConfig[0].url);
        else
            _this.initApp();
    }

    //

    this.initApp = function()
    {
        if(_blurEffect)
            _this.initBlurEffect();
        _this.initObject();
        _this.initLights();
        _this.drawSprites();
       // _this.initGui();
        _this.render();

        for(var i = 0 ; i < _objects.length ; i ++)
            _scene.add(_objects[i]);
        for(var i = 0 ; i < _lights.length ; i ++)
            _scene.add(_lights[i]);

        //postMaterial1.uniforms.focalDepth.value = 5.0

    }

    //

    this.initObject = function()
    {

        var txtr = new THREE.TextureLoader().load("./material/unitBack.png");
        txtr.matrixAutoUpdate = false; // 设置纹理属性matrixAutoUpdate为false以后，纹理将通过matrix属性设置的矩阵更新纹理显示
        txtr.wrapS = txtr.wrapT = THREE.RepeatWrapping; //设置为可循环
        //txtr.wrapS = txtr.wrapT = THREE.ClampToEdgeWrapping; //设置会默认的最后一像素伸展
        txtr.needsUpdate = true;
        var geo0 = new THREE.PlaneGeometry(100,100);
        var mtr0 = new THREE.MeshPhysicalMaterial({
            color: 0xffffff ,
            map : txtr ,
            emissive: 0x000000,// emissive默认黑色，设置为白色
            //emissiveMap: texLoader.load("./material/Mars_MGS_colorhillshade_mola_1024.jpg"),
            emissiveIntensity: 1
        })
        var mesh0 = new THREE.Mesh(geo0 , mtr0);
        mesh0.castShadow = mesh0.receiveShadow = true;
        mesh0.rotation.x = -0.5 * Math.PI;//将平面绕X轴逆时针旋转90度

        _material4 = mtr0;

        //


        /*
        //反光材质

        //_cubeCamera = new THREE.CubeCamera(0.01, 100, 36, { encoding: THREE.sRGBEncoding });
        _cubeCamera = new THREE.CubeCamera(0.01, 100, 512);
        var geo1 = new THREE.SphereGeometry(.1 , 32 ,32);
        var mtr1 = new THREE.MeshBasicMaterial({
            color : 0xffffff ,
            //shininess: 50,
            //color: 0xffffff,
            //specular: 0x999999,
            envMap: _cubeCamera.renderTarget.texture
        })
        //mtr1.color.offsetHSL( 0.1, - 0.1, 0 );

        var mesh = addObject( geo1, mtr1, 350, 100, - 350, 0 );
        mesh.position.set(0, 1.4 , 0);
        mesh.add( _cubeCamera );

        function addObject( geometry, material, x, y, z, ry ) {
            var tmpMesh = new THREE.Mesh( geometry, material );
            tmpMesh.material.color.offsetHSL( 0.1, - 0.1, 0 );
            tmpMesh.position.set( x, y, z );
            tmpMesh.rotation.y = ry;
            tmpMesh.castShadow = true;
            tmpMesh.receiveShadow = true;
            _objects.push( tmpMesh );
            return tmpMesh;
        }

        */



        //圆环特效

        for(var i = 0 ; i < _rotationPlanesConfig.length ; i ++)
        {
            var txtr = new THREE.TextureLoader().load(_rotationPlanesConfig[i].textureDir);
            var geo = new THREE.PlaneGeometry(_rotationPlanesConfig[i].planeSize[0] , _rotationPlanesConfig[i].planeSize[1]);
            var mtr = new THREE.MeshPhysicalMaterial({
                color: 0xffffff ,
                map : txtr ,
                transparent : true ,
                opacity : _rotationPlanesConfig[i].opacity ,
                alphaTest : .1
            })
            var mesh = new THREE.Mesh(geo , mtr);
            //mesh.castShadow = mesh.receiveShadow = true;
            mesh.rotation.x = -0.5 * Math.PI;//将平面绕X轴逆时针旋转90度
            mesh.position.set( _rotationPlanesConfig[i].position[0] , _rotationPlanesConfig[i].position[1] , _rotationPlanesConfig[i].position[2]);
            mesh.renderOrder = _objects.length + i;

            _rotationPlanesConfig[i].mesh = mesh;
            _objects.push(mesh);
        }


        var geoPlane = new THREE.PlaneGeometry(100 ,100);
        var txtr = new THREE.TextureLoader().load("./material/circle3.png");
        txtr.matrixAutoUpdate = false; // 设置纹理属性matrixAutoUpdate为false以后，纹理将通过matrix属性设置的矩阵更新纹理显示
        //txtr.wrapS = txtr.wrapT = THREE.RepeatWrapping; //设置为可循环
        //txtr.wrapS = txtr.wrapT = THREE.ClampToEdgeWrapping; //设置会默认的最后一像素伸展
        txtr.needsUpdate = true;

        var mtr = new THREE.MeshBasicMaterial({
            //color : 0xff0000
            map : txtr ,
            transparent : true ,
            opacity : .5 ,
            alphaTest : .1
        })
        var mesh = new THREE.Mesh(geoPlane , mtr);
        mesh.rotation.x = -0.5 * Math.PI;//将平面绕X轴逆时针旋转90度
        mesh.position.set(0, 1, 0);
        mesh.renderOrder = _objects.length + 1;
        _objects.push(mesh);

        _material6 = mtr;

        console.log(txtr)


        /*
        var geocub = new THREE.CubeGeometry(1 , 1 , 1)
        var mtr = new THREE.MeshPhongMaterial({ color : 0xff0000 , shineness : 100 })
        var mesh = new THREE.Mesh(geocub , mtr);
        mesh.castShadow = mesh.receiveShadow = true;
        mesh.position.set(0,2,0);
        _objects.push(mesh);
        */


        _objects.push(mesh0);


    }

    this.initLights = function()
    {

        /*
        var spotLight = new THREE.SpotLight( 0x6677a8 , 1 );
        spotLight.name = 'Spot Light';
        spotLight.angle = Math.PI / 5;
        spotLight.penumbra = 0.3;
        spotLight.position.set( 0, 30 , -30 );
        spotLight.castShadow = true;
        spotLight.shadow.camera.near = 8;
        spotLight.shadow.camera.far = 1000;
        spotLight.shadow.mapSize.width = 5000;
        spotLight.shadow.mapSize.height = 5000;
        spotLight.shadow.bias = -0.002;
        spotLight.shadow.radius = 1;


        var spotLight1 = new THREE.SpotLight( 0xffffff , .8 );
        spotLight1.name = 'Spot Light';
        spotLight1.angle = Math.PI / 5;
        spotLight1.penumbra = 0.3;
        spotLight1.position.set( 0, 30 , -15 );
        //spotLight1.castShadow = true;
        spotLight1.shadow.camera.near = 8;
        spotLight1.shadow.camera.far = 1000;
        spotLight1.shadow.mapSize.width = 5000;
        spotLight1.shadow.mapSize.height = 5000;
        spotLight1.shadow.bias = -0.002;
        spotLight1.shadow.radius = 2;

        var spotLight2 = new THREE.SpotLight( 0xffffff , .8 );
        spotLight2.name = 'Spot Light';
        spotLight2.angle = Math.PI / 5;
        spotLight2.penumbra = 0.3;
        spotLight2.position.set( 0, 8 , 0 );
        spotLight2.castShadow = true;
        spotLight2.shadow.camera.near = 8;
        spotLight2.shadow.camera.far = 1000;
        spotLight2.shadow.mapSize.width = 5000;
        spotLight2.shadow.mapSize.height = 5000;
        spotLight2.shadow.bias = -0.002;
        spotLight2.shadow.radius = 2;
        */

        //灯光
        //var bias = 0;
        var bias = -0.000085 ;

        var spotLight = new THREE.SpotLight( 0xffffff , 1 );
        spotLight.name = 'Spot Light';
        spotLight.angle = Math.PI / 5;
        spotLight.penumbra = 0.3;
        spotLight.position.set( 10, 40 , -40 );
        spotLight.castShadow = true;
        spotLight.shadow.camera.near = 8;
        spotLight.shadow.camera.far = 1000;
        spotLight.shadow.mapSize.width = 8000;
        spotLight.shadow.mapSize.height = 8000;
        spotLight.shadow.bias = bias;
        spotLight.shadow.radius = 1;


        var spotLight1 = new THREE.SpotLight( 0xffffff , .8 );
        spotLight1.name = 'Spot Light';
        spotLight1.angle = Math.PI / 5;
        spotLight1.penumbra = 0.3;
        spotLight1.position.set( -10, 30 , 50 );
        //spotLight1.castShadow = true;
        spotLight1.shadow.camera.near = 8;
        spotLight1.shadow.camera.far = 1000;
        spotLight1.shadow.mapSize.width = 5000;
        spotLight1.shadow.mapSize.height = 5000;
        spotLight1.shadow.bias = bias;
        spotLight1.shadow.radius = 0;

        var spotLight2 = new THREE.SpotLight( 0xffffff ,.8);
        spotLight2.name = 'Spot Light';
        spotLight2.angle = Math.PI / 5;
        spotLight2.penumbra = 0.3;
        spotLight2.position.set( -2 , 5 , 0 );
        //spotLight2.castShadow = true;
        spotLight2.shadow.camera.near = 8;
        spotLight2.shadow.camera.far = 1000;
        spotLight2.shadow.mapSize.width = 1024;
        spotLight2.shadow.mapSize.height = 1024;
        spotLight2.shadow.bias = bias;
        spotLight2.shadow.radius = 0;


        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff , 1);
        hemiLight.position.set(0, 1, 10); //这个也是默认位置

        _lights.push(spotLight);
        _lights.push(spotLight1);
        _lights.push(spotLight2);
        _lights.push(hemiLight);



    }
    this.getTotalLengthByName=function(meshname)
    {
        for (let index = 0; index < _cistrictNames.length; index++) {
            const element = _cistrictNames[index];
            if(element.en==meshname)
            {
                return {totalapplications:element.totalapplications,totalLength:element.totalLength}
            }
        }
    }

    this.drawSprites = function()
    {
        var scaleB = .5;
        var size = [1000 , 300];
        var bx = 1;
        var by = 1;
        if(size[0] < size[1])
        {
            bx = size[0] / size[1] * scaleB;
            by = scaleB;
        }
        else
        {
            bx = scaleB;
            by = size[1] / size[0] * scaleB;
        }

        for(var i = 0 ; i < _meshFaceProvince.length ; i ++)
        {
            var mesh = _meshFaceProvince[i];

            //近距离
            var rx = 0.2 + Math.random() * 1.2;
            var ry = 0.8;
            //var ry = 0.8 + Math.random() * 1.5;
            var rz = 0.2 + Math.random() * 1.2;

            /*
            var rx = 0.2 + Math.random() * .3;
            var ry = 5.5;
            //var ry = 0.8 + Math.random() * 1.5;
            var rz = 5;
            */
            mesh.cameraPosition = { x : mesh.position.x + (-rx + Math.random() * rx * 2) ,
                y : mesh.position.y + ry ,
                z : mesh.position.z + rz
            };

            var meshName = mesh.name.split("_")[1];

            var total =this.getTotalLengthByName(meshName);
            
            //return {totalapplications:element.totalapplications,totalLength:element.totalLength}
            var txtr = new THREE.CanvasTexture( _this.createMapLab(size , Datas.getItemByKey( _cistrictNames , "en" , meshName ).cn,meshName,total.totalapplications,total.totalLength) );
            var mtr = new THREE.SpriteMaterial( { map :txtr , opacity : 0 } );
            var spr = new THREE.Sprite(mtr);
            spr.name = meshName;
            spr.visible = false;
            spr.scale.set(bx , by , 1);
            spr.position.set( mesh.position.x , 1.5 , mesh.position.z );

            _objects.push(spr);
            _spriteLabels.push(spr);
        }



    }

    this.createMapLab = function(size , labelCN , labelEN,totalapplications="",totalLength="")
    {
        var fontSize = 100;

        var cvs = document.createElement("canvas");
        cvs.width = size[0];
        cvs.height = size[1];
        var ctx = cvs.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = "rgba(25 , 25 , 25 , .9)";
        ctx.rect(0 , 0 , size[0] , size[1]);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "rgba(222 , 0 , 136 , 1)";
        ctx.rect(0 , 0 , size[0] / 30 , size[1]);
        ctx.closePath();
        ctx.fill();

        ctx.font = fontSize + "px Arial";
        ctx.fillStyle = "rgba(255,255,255,1)";// 设置颜色
        ctx.textAlign = "center";

        //ctx.fillText(labelCN , size[0] / 2 , fontSize);
        //ctx.fillText(labelEN , size[0] / 2 , fontSize * 2);

        ctx.strokeStyle= "rgba(0,0,0,1)";
        ctx.lineWidth = 5;
        ctx.strokeText(labelCN,size[0] / 2 , 80);
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fillText(labelCN , size[0] / 2 , 80 );

        ctx.font = (fontSize / 1.5) + "px Arial";

        ctx.strokeStyle= "rgba(0,0,0,1)";
        ctx.lineWidth = 5;
        ctx.strokeText(labelEN,size[0] / 2,145);
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fillText(labelEN , size[0] / 2 , 145 );

        //

        ctx.font = (fontSize / 1.8) + "px Arial";

        ctx.strokeStyle= "rgba(0,0,0,1)";
        ctx.lineWidth = 5;
        ctx.strokeText("Total applications:"+totalapplications,size[0] / 2,220);
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fillText("Total applications:"+totalapplications , size[0] / 2 , 220 );

        ctx.strokeStyle= "rgba(0,0,0,1)";
        ctx.lineWidth = 5;
        ctx.strokeText("Road networks total length:"+totalLength,size[0] / 2,270);
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fillText("Road networks total length:"+totalLength , size[0] / 2 , 270 );


        /*
        //变色文字
        let gradient=ctx.createLinearGradient(0,0,size[0],0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");
        ctx.strokeStyle=gradient;
        ctx.lineWidth= 5;
        ctx.strokeText("蚂蚁部落",10,50,60);
        */

        return cvs;
    }

    //

    this.getMeshByName = function(name)
    {
        for(var i = 0 ; i < _meshFaceProvince.length ; i ++)
        {
            if(_meshFaceProvince[i].name == name)
                return _meshFaceProvince[i];
        }
        return null;
    }

    
//#endre
    var _meshIndex = 0;
    this.areaSelectHandler = function(name)
    {
        //var mesh = _meshFaceProvince[_meshIndex];
        var mesh = this.getMeshByName(name);
        console.log("MESH:\n    " + mesh.name);

        this.stopAllTween();
        this.meshSelectHandler(mesh.name);
        this.cameraMoveHandler(mesh);
        this.spriteLabelSelectHandler(mesh.name.split("_")[1]);

        //if(_meshIndex < _meshFaceProvince.length - 1)   _meshIndex ++;
        //else    _meshIndex = 0;

    }

    this.cameraMoveHandler = function(mesh)
    {
        _controls.enabled = false;
        var p0 = {x : _camera.position.x , y : _camera.position.y , z : _camera.position.z};
        var p1 = {x : mesh.cameraPosition.x , y : mesh.cameraPosition.y , z : mesh.cameraPosition.z };
        var v0 = {
            x0 : p0.x ,
            y0 : p0.y ,
            z0 : p0.z ,
            x1 : _saveCameraLookAt.x ,
            y1 : _saveCameraLookAt.y ,
            z1 : _saveCameraLookAt.z
        };
        var v1 = {
            x0 : p1.x ,
            y0 : p1.y ,
            z0 : p1.z ,
            x1 : mesh.position.x ,
            y1 : mesh.position.y ,
            z1 : mesh.position.z
        };
        var tw1 = this.cameraTween(v0 , v1);
        tw1.start();
        _tweens.push(tw1);
    }
    this.meshSelectHandler = function(name)
    {
        for(var i = 0 ; i < _meshFaceProvince.length ; i ++)
        {
            if(_meshFaceProvince[i].name == name)
                _meshFaceProvince[i].material = _materialMapOnSelected;
            else
                _meshFaceProvince[i].material = _materialMapDefualt;
        }
    }

    this.spriteLabelSelectHandler = function(meshName)
    {
        for(var i = 0 ; i < _spriteLabels.length ; i ++)
        {
            var sprLabel = _spriteLabels[i];
            if(sprLabel.name == meshName)
            {
                if(sprLabel.material.opacity != 1)
                {
                    sprLabel.visible = true;
                    var tw = this.sprLabelOpacityTween(sprLabel , { opacity : sprLabel.material.opacity } , { opacity : 1 } );
                    tw.start();
                    _tweens.push(tw);
                }
            }
            else
            {
                if(sprLabel.material.opacity != 0)
                {
                    var tw = this.sprLabelOpacityTween(sprLabel , { opacity : sprLabel.material.opacity } , { opacity : 0 } );
                    tw.start();
                    _tweens.push(tw);
                }
            }
        }
    }

    //

    this.stopAllTween = function()
    {
        for(var i = 0 ; i < _tweens.length ; i ++)
            _tweens[i].stop();
        _tweens = [];
    }

    this.cameraLookAtTween = function (p1 , p2 , time=2000)
    {
        var tw = new TWEEN.Tween(p1);
        tw.to(p2 , time).easing(TWEEN.Easing.Sinusoidal.InOut);
        var update = function ()
        {
            _saveCameraLookAt = new THREE.Vector3(p1.x , p1.y , p1.z);
            _camera.lookAt( _saveCameraLookAt );
        }
        tw.onUpdate(update);
        return tw;
    }

    this.cameraTween = function (p0 , p1 , time=2000)
    {
        var tw = new TWEEN.Tween(p0);
        tw.to(p1 , time).easing(TWEEN.Easing.Sinusoidal.InOut);
        var update = function ()
        {
            console.log("camera moving....");
            _camera.position.set(p0.x0 , p0.y0 , p0.z0);
            _saveCameraLookAt = new THREE.Vector3(p0.x1 , p0.y1 , p0.z1);
            _camera.lookAt( _saveCameraLookAt );
            _controls.target.x = p0.x1;
            _controls.target.y = p0.y1;
            _controls.target.z = p0.z1;
            _controls.update();
        }
        var com = function()
        {
            _controls.enabled = true;
        }
        tw.onUpdate(update);
        tw.onComplete(com);
        return tw;
    }

    this.sprLabelOpacityTween = function(spr , startValue , endValue , time=2000)
    {
        var tw = new TWEEN.Tween(startValue);
        tw.to(endValue , time).easing(TWEEN.Easing.Linear.None);
        var update = function()
        {
            spr.material.opacity = startValue.opacity;
        }
        var complete = function()
        {
            if(spr.material.opacity == 0)
                spr.visible = false;
        }
        tw.onUpdate(update);
        tw.onComplete(complete);
        return tw;
    }

    //

    // this.initGui = function()
    // {

    //     //声明一个保存需求修改的相关数据的对象
    //     _guiData = {
    //         offsetX: 0,
    //         offsetY: 0,
    //         repeatX: 1,
    //         repeatY: 1,
    //         rotation: 0,
    //         centerX: 0.5,
    //         centerY: 0.5,
    //         RepeatWrapping:true
    //     };

    //     //将设置属性添加到_gui当中，_gui.add(对象，属性，最小值，最大值）
    //     _gui.add(_guiData, "offsetX", 0.0, 1.0 ).onChange(_this.updateUV);
    //     _gui.add(_guiData, "offsetY", 0.0, 1.0).onChange(_this.updateUV);
    //     _gui.add(_guiData, "repeatX", 0.25, 2.0).onChange(_this.updateUV);
    //     _gui.add(_guiData, "repeatY", 0.25, 2.0).onChange(_this.updateUV);
    //     _gui.add(_guiData, "rotation", - 2.0, 2.0).onChange(_this.updateUV);
    //     _gui.add(_guiData, "centerX", 0.0, 1.0).onChange(_this.updateUV);
    //     _gui.add(_guiData, "centerY", 0.0, 1.0).onChange(_this.updateUV);
    //     _gui.add(_guiData, "RepeatWrapping").onChange(function (e) {
    //         console.log(e);
    //         if(e){
    //             _material.map.wrapS = _material.map.wrapT = THREE.RepeatWrapping; //设置为可循环
    //         }
    //         else{
    //             _material.map.wrapS = _material.map.wrapT = THREE.ClampToEdgeWrapping; //设置会默认的最后一像素伸展
    //         }
    //         _material.map.needsUpdate = true;
    //     });

    //     /*
    //     //调整景深
    //     var controller_speed = _gui.add(config, 'focalDepth', 0, 30);
    //     controller_speed.onChange(function(value) {
    //         config.focalDepth = value;
    //         postMaterial1.uniforms.focalDepth.value = value;
    //     });
    //     */

    //     var params = {
    //         color: 0xffffff,
    //         transparency: 0.90,
    //         envMapIntensity: 1,
    //         lightIntensity: 1,
    //         exposure: 1,
    //         visible : false ,
    //         button: function()
    //         {
    //             //_this.areaSelectHandler();
    //             _this.areaSelectHandler("face_banan");
    //         }
    //     };
    //     _gui.add(params, "button");


    // }

    //更新纹理贴图的方法
    this.updateUV = function()
    {
        // 一种方法，直接全写在一个方法内
        //texture.matrix.setUvTransform( API.offsetX, API.offsetY, API.repeatX, API.repeatY, API.rotation, API.centerX, API.centerY );
        // 另一种方法，分开写
        _material6.map.matrix
            .identity() //矩阵重置
            .translate( - _guiData.centerX, - _guiData.centerY ) //设置中心点
            .rotate( _guiData.rotation ) // 旋转
            .scale( _guiData.repeatX, _guiData.repeatY ) //缩放
            .translate( _guiData.centerX, _guiData.centerY ) //设置中心点
            .translate( _guiData.offsetX, _guiData.offsetY ); //偏移
    }


    this.render = function()
    {
        if(_viewAround)
        {
            //var pp = new THREE.Vector3(0, 0, 0);
            _rotation += 0.001;
            _camera.position.x = Math.sin(_rotation)* 5;
            //camera.position.y = 0;
            _camera.position.z = Math.cos(_rotation)* 5;
            _camera.lookAt(pp); //原点
        }

        if(_material)
        {
            _material.map.matrix.identity() //矩阵重置
            _material.map.matrix.scale( 10, 1 ) //缩放
            _material.map.matrix.translate( _offsetX , 0 ); //偏移
            if(_offsetX < 1)
                _offsetX += _offsetSpeed;
            else
                _offsetX = -10;
        }

        if(_material2)
        {
            _material2.map.matrix.identity() //矩阵重置
            _material2.map.matrix.scale( 1, 1 ) //缩放
            _material2.map.matrix.translate( 0, _offsetX2 ); //偏移
            if(_offsetX2 < 2)
                _offsetX2 += _offsetSpeed / 2;
            else
                _offsetX2 = -1;
        }

        if(_material3)
        {
            _material3.map.matrix.identity() //矩阵重置
            _material3.map.matrix.scale( 5, 1 ) //缩放
            _material3.map.matrix.translate( _offsetX3, 0 ); //偏移
            if(_offsetX3 < 2)
                _offsetX3 += _offsetSpeed / 5;
            else
                _offsetX3 = -1;
        }

        if(_material4)
        {
            _material4.map.matrix.identity() //矩阵重置
            _material4.map.matrix.scale(200,200); //缩放
            _material4.map.matrix.translate( 0, _offsetX3 ); //偏移

            if(_offsetX3 < 2)
                _offsetX3 += _offsetSpeed / 25;
            else
                _offsetX3 = -1;
        }

        if(_material5)
        {
            _material5.map.matrix.identity() //矩阵重置
            _material5.map.matrix.scale(10,10); //缩放
            _material5.map.matrix.translate( _offsetX5 , 0 ); //偏移

            if(_offsetX5 < 2)
                _offsetX5 += _offsetSpeed / 2;
            else
                _offsetX5 = -1;
        }

        if(_material6)
        {
            _material6.map.matrix
                .identity() //矩阵重置
                .translate( - 0.5, - 0.5 ) //设置中心点
                .rotate( 0 ) // 旋转
                .scale( _offsetX6 , _offsetX6 ) //缩放
                .translate( 0.5, 0.5 ) //设置中心点
                .translate( 0 , 0 ); //偏移

            if(_offsetX6 > 1)
                _offsetX6 -= .5 * (_offsetX6 / 20);
            else
                _offsetX6 = 100;

        }

        for(var i = 0 ; i < _rotationPlanesConfig.length ; i ++)
        {
            if(_rotationPlanesConfig[i].mesh)
                _rotationPlanesConfig[i].mesh.rotation.z += _rotationPlanesConfig[i].rotateSpeed;
        }



        if(_line){
            //_ballMoveOnLine.rotation.y += .01;
            var point = _line.getPoint(_progress);
            var point1 = _line.getPoint(_progress + 0.000001);
            if(point && point.x)
            {
                _ballMoveOnLine.position.set(point.x,point.y,point.z);
                _ballMoveOnLine.lookAt(point1.x, point1.y , point1.z);
            }
            if(point1 && point1.x)
            {
                _ballMoveOnLine.position.set(point.x,point.y,point.z);
                _ballMoveOnLine.lookAt(point1.x, point1.y , point1.z);
            }

            if(_progress > 1.0)
                _progress = 0;
            else
                _progress += 0.001;
        }





        if(_stats)
            _stats.update();

        if(_blurEffect)
        {
            // render scene into target
            _renderer.setRenderTarget( target1 );
            _renderer.render( _scene, _camera );

            // render post FX
            _renderer.setRenderTarget( target2 );
            _renderer.render( postScene1, postCamera1 );

            _renderer.setRenderTarget( null );
            _renderer.render( postScene2, postCamera2 ) ;
        }
        else
        {

            _renderer.render(_scene , _camera);

        }

        if(_materialMapOnSelected)
        {
            if(!_mloop)
            {
                if(_materialMapOnSelected.opacity < 1)
                    _materialMapOnSelected.opacity += 0.01;
                else
                    _mloop = !_mloop;
            }
            else
            {
                if(_materialMapOnSelected.opacity > 0.6)
                    _materialMapOnSelected.opacity -= 0.01;
                else
                    _mloop = !_mloop;
            }
        }

        if(_cubeCamera)
        {
            _cubeCamera.update(_renderer , _scene);
        }


        //console.log("---------: "  + 0xffffff)
        TWEEN.update();
        requestAnimationFrame( _this.render );


    }
    // this.initCamera = function() {
    //     _camera = new THREE.PerspectiveCamera( 50, 3000 / 1200, 0.1, 100 );
    //     _camera.position.set( 0, 6 , 0.5 );
    //     _saveCameraLookAt = new THREE.Vector3(-1,0,0);
    //     _camera.lookAt(_saveCameraLookAt);
    // }

    var _mloop = false;



};

export { MapChina3d };