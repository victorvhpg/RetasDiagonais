var RetasDiagonais = function(opt){
    opt =  opt || {};
    this.canvas  = opt.canvas ||  (function(){
        var ca = document.createElement("canvas") ;
        document.body.appendChild(ca);
        return ca;
    })();
    this.ctx = null;
    this.LADO = opt.LADO || 500;
                    
    this.espacoEntreDiagonais = 1;
    this.direcao  =1 ;
};
RetasDiagonais.init = function(opt){
    return (new this(opt)).init();
                    
};
RetasDiagonais.prototype  = {
    constructor : RetasDiagonais ,
    init : function(){
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.LADO;
        this.canvas.height =this.LADO;
        this.canvas.style.border = "1px solid #000";
        this.loop();
        return this;
    },
    loop : function(){
        var that = this;
        window.requestAnimationFrame(function(t){
            that.processa();
            that.loop() ;
        });  
    },
    getEspacoEntreDiagonais  : function(espacoEntreDiagonais ,direcao){
        return (espacoEntreDiagonais + (2 * direcao))+1;
    },
    desenha : function(espacoEntreDiagonais){
                      
        //limpa a tela
        this.ctx.clearRect(0, 0,this.LADO,this.LADO);
        //inicia o path
        this.ctx.beginPath();
        this.ctx.strokeStyle = "rgba(0,0,0,1)";
        //desenha as setas  diagonais a partir dos quatro cantos diagonais do canvas
        for(var i =0; i <this.LADO;i += espacoEntreDiagonais ){
            // a partir da diagonal  superior esquerda
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(this.LADO-i, i);
            // a partir da diagonal inferior direita
            this.ctx.moveTo(this.LADO,this.LADO);
            this.ctx.lineTo(this.LADO-i, i);
            // a partir da diagonal superior direita
            this.ctx.moveTo(this.LADO,  0);
            this.ctx.lineTo(this.LADO-i,this.LADO-i);
            // a partir da diagonal inferior esquerda
            this.ctx.moveTo(0, this.LADO);
            this.ctx.lineTo(this.LADO-i,this.LADO-i);  
        }   
        this.ctx.stroke();
        this.ctx.closePath();
                     
    },
    processa : function(){
        this.espacoEntreDiagonais = this.getEspacoEntreDiagonais( this.espacoEntreDiagonais , this.direcao);
        //se o espaco esta no limite maximo ou minimo entao inverte a direcao
        if(( this.espacoEntreDiagonais >= this.LADO &&  this.direcao ==1) || ( this.espacoEntreDiagonais <= 0 &&  this.direcao ==-1)){
            this.direcao =   this.direcao*-1;
            this.espacoEntreDiagonais = this.getEspacoEntreDiagonais( this.espacoEntreDiagonais , this.direcao);
        } 
        this.desenha(this.espacoEntreDiagonais);
    }
};
//=================================================================