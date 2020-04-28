
var Datas = {};

Datas = (function(){

    var Return = {

        _resource : {} ,

        _cashCanvas: null ,
        _cashCtx: null,
        _canvas: null ,
        _ctx: null ,
        _useCash: true ,

        _main: null ,
        _timer : null ,
        _buttons : [] ,
        _buttonOnTouch : null ,

        _reg : /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/ ,

        getItemByKey : function(arr , key , value)  //在数组内根据内容查找对象
        {
            for(var i = 0 ; i < arr.length ; i ++)
            {
                if(arr[i][key] == value)
                    return arr[i];
            }
            return null;
        } ,

        getResourceByKey : function(key)   //公有方法
        {
            for (var k in this._resource) {
                if (k == key)
                    return this._resource[k];
            }
        } ,

        getMeshInGroupByName : function(group , name)   //在载入模型中查找对象
        {
            for(var i = 0 ; i < group.children.length ; i ++)
            {
                if(group.children[i].type == "Mesh")
                {
                    //console.log("group.children[i].name: " + group.children[i].name)
                    if(group.children[i].name == name)
                        return group.children[i];
                }
                else if(group.children[i].type == "Group")
                {
                    //console.log("   found group...: " + group.children[i].children.length);
                    return this.getMeshInGroupByName(group.children[i].children , name);
                }

            }
            return null;
        } ,

        getRandomRGB : function()  //rgb颜色随机
        {
            var r = Math.floor(Math.random()*256);
            var g = Math.floor(Math.random()*256);
            var b = Math.floor(Math.random()*256);
            var rgb = '('+r+','+g+','+b+')';
            return rgb;
        } ,

        getRandomColor16 : function()  //十六进制颜色随机
        {
            var r = Math.floor(Math.random()*256);
            var g = Math.floor(Math.random()*256);
            var b = Math.floor(Math.random()*256);
            var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
            return color;
        } ,

        colorHex : function()
        {
            var that = this;
            if(/^(rgb|RGB)/.test(that)){
                var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
                var strHex = "#";
                for(var i=0; i<aColor.length; i++){
                    var hex = Number(aColor[i]).toString(16);
                    if(hex === "0"){
                        hex += hex;
                    }
                    strHex += hex;
                }
                if(strHex.length !== 7){
                    strHex = that;
                }
                return strHex;
            }else if(this._reg.test(that)){
                var aNum = that.replace(/#/,"").split("");
                if(aNum.length === 6){
                    return that;
                }else if(aNum.length === 3){
                    var numHex = "#";
                    for(var i=0; i<aNum.length; i+=1){
                        numHex += (aNum[i]+aNum[i]);
                    }
                    return numHex;
                }
            }else{
                return that;
            }
        } ,

        colorRgb : function()
        {
            var sColor = this.toLowerCase();
            if(sColor && this._reg.test(sColor)){
                if(sColor.length === 4){
                    var sColorNew = "#";
                    for(var i=1; i<4; i+=1){
                        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
                    }
                    sColor = sColorNew;
                }
                //处理六位的颜色值
                var sColorChange = [];
                for(var i=1; i<7; i+=2){
                    sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
                }
                return "RGB(" + sColorChange.join(",") + ")";
            }else{
                return sColor;
            }
        } ,

        //32进制转rgba hexToRgba("#ff0000" , 1);
        hexToRgba : function(hex, opacity)
        {
            var RGBA = "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt( "0x" + hex.slice(5, 7)) + "," + opacity + ")";
            return {
                red: parseInt("0x" + hex.slice(1, 3)),
                green: parseInt("0x" + hex.slice(3, 5)),
                blue: parseInt("0x" + hex.slice(5, 7)),
                rgba: RGBA
            }
        }




    };
    return Return;

})();

export {Datas}



/*
var Core = {};
Core.StaticClass = (function(){
    var Return = {
        Property: "Test Static Property",    //公有属性
        Method: function(){    //公有方法
            alert(_Field);    //调用私用字段
            privateMethod();    //调用私用方法
        }
    };    //定义返回的公有对象

    var _Field = "Test Static Field";    //私有字段
    var privateMethod = function(){    //私有方法
        alert(Return.Property);    //调用属性
    }

    return Return;    //生成公有静态元素
})();
*/

