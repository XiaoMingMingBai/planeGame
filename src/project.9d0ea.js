window.__require=function e(t,o,n){function i(c,a){if(!o[c]){if(!t[c]){var r=c.split("/");if(r=r[r.length-1],!t[r]){var u="function"==typeof __require&&__require;if(!a&&u)return u(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+c+"'")}c=r}var l=o[c]={exports:{}};t[c][0].call(l.exports,function(e){return i(t[c][1][e]||e)},l,l.exports,e,t,o,n)}return o[c].exports}for(var s="function"==typeof __require&&__require,c=0;c<n.length;c++)i(n[c]);return i}({bulletGroup:[function(require,module,exports){"use strict";cc._RF.push(module,"3d2d93zegRMeaoaPHxucDMn","bulletGroup");var bPosition=cc.Class({name:"bPosition",properties:{xAxis:{default:"",tooltip:"\u521d\u59cbx\u8f74\uff0c\u76f8\u5bf9hero"},yAxis:{default:"",tooltip:"\u521d\u59cby\u8f74\uff0c\u76f8\u5bf9hero"}}}),bulletInfinite=cc.Class({name:"bulletInfinite",properties:{name:"",freqTime:0,initPollCount:0,prefab:cc.Prefab,position:{default:[],type:bPosition,tooltip:"\u6bcf\u6b21\u591a\u5c11\u6392\u5b50\u5f39"}}}),bulletFiniteG=cc.Class({name:"bulletFiniteG",extends:bulletInfinite,properties:{finiteTime:0,orginName:""}});cc.Class({extends:cc.Component,properties:function(){return{bulletInfinite:{default:null,type:bulletInfinite,tooltip:"\u65e0\u9650\u65f6\u957f\u5b50\u5f39\u7ec4"},bulletFiniteG:{default:[],type:bulletFiniteG,tooltip:"\u6709\u9650\u65f6\u957f\u5b50\u5f39\u7ec4"},hero:cc.Node}},onLoad:function(){this.eState=D.commonInfo.gameState.none,D.common.initObjPool(this,this.bulletInfinite),D.common.batchInitObjPool(this,this.bulletFiniteG)},startAction:function(){this.eState=D.commonInfo.gameState.start,this.getNewbullet(this.bulletInfinite),this.bICallback=function(){this.getNewbullet(this.bulletInfinite)}.bind(this),this.schedule(this.bICallback,this.bulletInfinite.freqTime)},pauseAction:function(){this.enabled=!1,this.eState=D.commonInfo.gameState.pause},resumeAction:function(){this.enabled=!0,this.eState=D.commonInfo.gameState.start},changeBullet:function(e){this.unschedule(this.bICallback),this.unschedule(this.bFCallback);for(var t=0;t<this.bulletFiniteG.length;t++)if(this.bulletFiniteG[t].orginName==e){this.bFCallback=function(e){this.getNewbullet(this.bulletFiniteG[e])}.bind(this,t),this.schedule(this.bFCallback,this.bulletFiniteG[t].freqTime,this.bulletFiniteG[t].finiteTime);var o=this.bulletFiniteG[t].freqTime*this.bulletFiniteG[t].finiteTime;this.schedule(this.bICallback,this.bulletInfinite.freqTime,cc.macro.REPEAT_FOREVER,o)}},getNewbullet:function(e){for(var t=e.name+"Pool",o=0;o<e.position.length;o++){var n=D.common.genNewNode(this[t],e.prefab,this.node),i=this.getBulletPostion(e.position[o]);n.setPosition(i),n.getComponent("bullet").bulletGroup=this}},getBulletPostion:function getBulletPostion(posInfo){var hPos=this.hero.getPosition(),newV2_x=hPos.x+eval(posInfo.xAxis),newV2_y=hPos.y+eval(posInfo.yAxis);return cc.v2(newV2_x,newV2_y)},bulletDied:function(e){D.common.backObjPool(this,e)}}),cc._RF.pop()},{}],bullet:[function(e,t,o){"use strict";cc._RF.push(t,"81be82YwS9L1LZYufVXSrCP","bullet"),cc.Class({extends:cc.Component,properties:{xSpeed:cc.Integer,ySpeed:cc.Integer,hpDrop:cc.Integer},onLoad:function(){cc.director.getCollisionManager().enabled=!0},onCollisionEnter:function(e,t){this.bulletGroup.bulletDied(t.node)},update:function(e){this.bulletGroup.eState==D.commonInfo.gameState.start&&(this.node.x+=e*this.xSpeed,this.node.y+=e*this.ySpeed,this.node.y>this.node.parent.height&&this.bulletGroup.bulletDied(this.node))}}),cc._RF.pop()},{}],common:[function(e,t,o){"use strict";cc._RF.push(t,"67917VzMgFG4LdHbqjwaGkY","common");var n=cc.Enum({none:0,start:1,stop:2}),i=cc.Class({extends:cc.Component,properties:{},statics:{gameState:n},onLoad:function(){D.commonInfo=i,D.common=this},batchInitObjPool:function(e,t){for(var o=0;o<t.length;o++){var n=t[o];this.initObjPool(e,n)}},initObjPool:function(e,t){var o=t.name+"Pool";e[o]=new cc.NodePool;for(var n=t.initPollCount,i=0;i<n;++i){var s=cc.instantiate(t.prefab);e[o].put(s)}},genNewNode:function(e,t,o){var n=null;return n=e.size()>0?e.get():cc.instantiate(t),o.addChild(n),n},backObjPool:function(e,t){e[t.name+"Pool"].put(t)},timeFmt:function(e,t){var o={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};for(var n in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),o)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?o[n]:("00"+o[n]).substr((""+o[n]).length)));return t}});cc._RF.pop()},{}],end:[function(e,t,o){"use strict";cc._RF.push(t,"c597br4kitB+7t22tMQBl2k","end"),cc.Class({extends:cc.Component,properties:{topScore:cc.Label,currentScore:cc.Label},onLoad:function(){var e=cc.sys.localStorage.getItem("topScore");this.topScore.string=e;var t=cc.sys.localStorage.getItem("currentScore");this.currentScore.string=t,cc.director.preloadScene("historyScore")},gameRestart:function(){cc.director.loadScene("main")},gameExit:function(){cc.director.loadScene("start")},gotoHistoryScore:function(){cc.director.loadScene("historyScore")}}),cc._RF.pop()},{}],enemyGroup:[function(e,t,o){"use strict";cc._RF.push(t,"703caNdSJBMG5jxYvPFwWvP","enemyGroup");var n=cc.Class({name:"enemyG",properties:{name:"",freqTime:0,initPollCount:0,prefab:cc.Prefab}});cc.Class({extends:cc.Component,properties:function(){return{enemyG:{default:[],type:n},main:{default:null,type:e("main")}}},onLoad:function(){this.eState=D.commonInfo.gameState.none,D.common.batchInitObjPool(this,this.enemyG)},startAction:function(){this.eState=D.commonInfo.gameState.start;for(var e=0;e<this.enemyG.length;++e){var t=this.enemyG[e].freqTime,o="callback_"+e;this[o]=function(e){this.getNewEnemy(this.enemyG[e])}.bind(this,e),this.schedule(this[o],t)}},resumeAction:function(){this.enabled=!0,this.eState=D.commonInfo.gameState.start},pauseAction:function(){this.enabled=!1,this.eState=D.commonInfo.gameState.pause},getNewEnemy:function(e){var t=e.name+"Pool",o=D.common.genNewNode(this[t],e.prefab,this.node),n=this.getNewEnemyPositon(o);o.setPosition(n),o.getComponent("enemy").init()},getNewEnemyPositon:function(e){var t=Math.random()*(this.node.parent.width/2-e.width/2);Math.random()<.5&&(t=-t);var o=this.node.parent.height/2+e.height/2;return cc.v2(t,o)},enemyDied:function(e,t){D.common.backObjPool(this,e),parseInt(t)>0&&this.main.gainScore(t)},getScore:function(){return this.main.getScore()}}),cc._RF.pop()},{main:"main"}],enemy:[function(e,t,o){"use strict";cc._RF.push(t,"14abee9CoxCobWl/nmeEUv8","enemy"),cc.Class({extends:cc.Component,properties:{xMinSpeed:{default:0,type:cc.Integer,tooltip:"x\u8f74\u6700\u5c0f\u901f\u5ea6"},xMaxSpeed:{default:0,type:cc.Integer,tooltip:"x\u8f74\u6700\u5927\u901f\u5ea6"},yMinSpeed:{default:0,type:cc.Integer,tooltip:"y\u8f74\u6700\u5c0f\u901f\u5ea6"},yMaxSpeed:{default:0,type:cc.Integer,tooltip:"y\u8f74\u6700\u5927\u901f\u5ea6"},initHP:{default:0,type:cc.Integer,tooltip:"\u521d\u59cb\u751f\u547d\u503c"},initSpriteFrame:{default:null,type:cc.SpriteFrame,tooltip:"\u521d\u59cb\u5316\u7684\u56fe\u50cf"},score:{default:0,type:cc.Integer,tooltip:"\u6b7b\u540e\u83b7\u5f97\u7684\u5206\u6570"},enemyDownClip:{default:null,type:cc.AudioClip}},onLoad:function(){console.log("enemy onload"),cc.director.getCollisionManager().enabled=!0,this.xSpeed=Math.random()*(this.xMaxSpeed-this.xMinSpeed)+this.xMinSpeed,this.ySpeed=Math.random()*(this.yMaxSpeed-this.yMinSpeed)+this.yMinSpeed,this.enemyGroup=this.node.parent.getComponent("enemyGroup")},init:function(){"enemy"!=this.node.group&&(this.node.group="enemy"),this.hP!=this.initHP&&(this.hP=this.initHP);var e=this.node.getComponent(cc.Sprite);e.spriteFrame!=this.initSpriteFrame&&(e.spriteFrame=this.initSpriteFrame)},update:function(e){if(this.enemyGroup.eState==D.commonInfo.gameState.start){var t=this.enemyGroup.getScore();this.node.y+=t<=5e4?e*this.ySpeed:t>5e4&&t<=1e5?e*this.ySpeed-.5:t>1e5&&t<=15e4?e*this.ySpeed-1:t>15e4&&t<=2e5?e*this.ySpeed-1.5:t>2e5&&t<=3e5?e*this.ySpeed-2:e*this.ySpeed-3,this.node.x+=e*this.xSpeed,this.node.y<-this.node.parent.height/2&&this.enemyGroup.enemyDied(this.node,0)}},onCollisionEnter:function(e,t){if("bullet"==e.node.group){var o=e.node.getComponent("bullet");if(this.hP>0&&(this.hP-=o.hpDrop,this.hP<=0)){this.node.group="default";var n=this.getComponent(cc.Animation),i=t.node.name+"ani";n.play(i),n.on("finished",this.onFinished,this),cc.audioEngine.playEffect(this.enemyDownClip,!1)}}},onFinished:function(e){this.enemyGroup.enemyDied(this.node,this.score)}}),cc._RF.pop()},{}],globals:[function(e,t,o){"use strict";cc._RF.push(t,"2db22ldw1ZEWKAUUhqzblk7","globals"),window.D={common:null,commonInfo:null},cc._RF.pop()},{}],hero:[function(e,t,o){"use strict";cc._RF.push(t,"3f0ccHUefxOLK9+K5/zp2v4","hero"),cc.Class({extends:cc.Component,properties:function(){return{blowupani:{default:null,type:cc.Prefab,tooltip:"\u7206\u70b8\u52a8\u753b"},gameOverClip:{default:null,type:cc.AudioClip},main:{default:null,type:e("main")},bulletGroup:{default:null,type:e("bulletGroup")}}},onLoad:function(){this.eState=D.commonInfo.gameState.none,cc.director.getCollisionManager().enabled=!0,this.onDrag()},onDrag:function(){this.node.on("touchmove",this.dragMove,this)},offDrag:function(){this.node.off("touchmove",this.dragMove,this)},dragMove:function(e){var t=e.getLocation(),o=this.node.parent.convertToNodeSpaceAR(t),n=-this.node.parent.width/2+this.node.width/2,i=-n,s=-this.node.parent.height/2+this.node.height/2,c=-s;o.x<n&&(o.x=n),o.x>i&&(o.x=i),o.y<s&&(o.y=s),o.y>c&&(o.y=c),this.node.setPosition(o)},onCollisionEnter:function(e,t){if("ufo"==e.node.group)"ufoBullet"==e.node.name?this.bulletGroup.changeBullet(e.node.name):"ufoBomb"==e.node.name&&this.main.getUfoBomb();else{if("enemy"!=e.node.group)return!1;var o=this.node.getPosition(),n=cc.instantiate(this.blowupani);this.node.parent.addChild(n),n.setPosition(o),n.getComponent(cc.Animation).on("finished",this.onFinished,n),cc.audioEngine.playEffect(this.gameOverClip,!1),this.node.destroy(),this.main.gameOver()}},onFinished:function(e){this.destroy()}}),cc._RF.pop()},{bulletGroup:"bulletGroup",main:"main"}],historyScore:[function(e,t,o){"use strict";cc._RF.push(t,"c11abrWZANO2aVZSE4dxEvW","historyScore"),cc.Class({extends:cc.Component,properties:{itemPrefab:cc.Prefab,scrollContent:cc.Node,backGame:cc.Node},onLoad:function(){for(var e=JSON.parse(cc.sys.localStorage.getItem("score")),t=0;t<e.length;++t){var o=cc.instantiate(this.itemPrefab),n=e[t];this.scrollContent.addChild(o),o.getComponent("scoreItemTemplate").init({score:n.score,time:n.time})}this.backGame.on("touchstart",this.backGameO,this)},backGameO:function(){cc.director.loadScene("end")}}),cc._RF.pop()},{}],main:[function(e,t,o){"use strict";cc._RF.push(t,"6afa0phF7dPka/zlZtFFHow","main"),cc.Class({extends:cc.Component,properties:function(){return{pause:cc.Button,btnSprite:{default:[],type:cc.SpriteFrame,tooltip:"\u6682\u505c\u6309\u94ae\u4e0d\u540c\u72b6\u6001\u7684\u56fe\u7247"},bomb:cc.Node,gameMusic:{default:null,type:cc.AudioSource},useBombClip:{default:null,type:cc.AudioClip},enemyGroup:{default:null,type:e("enemyGroup")},hero:{default:null,type:e("hero")},ufoGroup:{default:null,type:e("ufoGroup")},bulletGroup:{default:null,type:e("bulletGroup")},scoreDisplay:cc.Label,bombNoDisplay:cc.Label}},onLoad:function(){this.score=0,this.bombNo=0,this.scoreDisplay.string=this.score,this.bombNoDisplay.string=this.bombNo,this.eState=D.commonInfo.gameState.start,this.enemyGroup.startAction(),this.bulletGroup.startAction(),this.ufoGroup.startAction(),this.bomb.on("touchstart",this.bombOnclick,this),this.gameMusic.play()},bombOnclick:function(){var e=this.bomb.getChildByName("bombNo").getComponent(cc.Label),t=parseInt(e.string);t>0?(e.string=t-1,this.removeEnemy(),cc.audioEngine.playEffect(this.useBombClip,!1)):console.log("\u6ca1\u6709\u5b50\u5f39")},pauseClick:function(){this.eState==D.commonInfo.gameState.pause?(this.resumeAction(),this.eState=D.commonInfo.gameState.start):this.eState==D.commonInfo.gameState.start&&(this.pauseAction(),this.eState=D.commonInfo.gameState.pause)},resumeAction:function(){this.enemyGroup.resumeAction(),this.bulletGroup.resumeAction(),this.ufoGroup.resumeAction(),this.hero.onDrag(),this.gameMusic.resume(),this.pause.normalSprite=this.btnSprite[0],this.pause.pressedSprite=this.btnSprite[1],this.pause.hoverSprite=this.btnSprite[1]},pauseAction:function(){this.enemyGroup.pauseAction(),this.bulletGroup.pauseAction(),this.hero.offDrag(),this.gameMusic.pause(),this.ufoGroup.pauseAction(),this.pause.normalSprite=this.btnSprite[2],this.pause.pressedSprite=this.btnSprite[3],this.pause.hoverSprite=this.btnSprite[3]},gainScore:function(e){this.score+=e,this.scoreDisplay.string=this.score.toString()},getScore:function(){return parseInt(this.scoreDisplay.string)},updateScore:function(){var e=this.scoreDisplay.string,t={score:e,time:D.common.timeFmt(new Date,"yyyy-MM-dd hh:mm:ss")},o=cc.sys.localStorage.getItem("score"),n=cc.sys.localStorage.getItem("topScore");(!n||parseInt(n)<parseInt(e))&&cc.sys.localStorage.setItem("topScore",e),o?((o=JSON.parse(o))instanceof Array||(o=[]),o.unshift(t)):(o=[]).unshift(t),cc.sys.localStorage.setItem("currentScore",e),cc.sys.localStorage.setItem("score",JSON.stringify(o))},removeEnemy:function(){this.enemyGroup.node.removeAllChildren()},getUfoBomb:function(){parseInt(this.bombNoDisplay.string)<3&&(this.bombNoDisplay.string+=1)},gameOver:function(){this.pauseAction(),this.updateScore(),cc.director.loadScene("end")}}),cc._RF.pop()},{bulletGroup:"bulletGroup",enemyGroup:"enemyGroup",hero:"hero",ufoGroup:"ufoGroup"}],scoreItemTemplate:[function(e,t,o){"use strict";cc._RF.push(t,"e7aaajpGBdAAaGaUimU4MnH","scoreItemTemplate"),cc.Class({extends:cc.Component,properties:{itemScore:cc.Label,itemTime:cc.Label},onLoad:function(){},init:function(e){this.itemScore.string="\u79ef\u5206\uff1a"+e.score,this.itemTime.string="\u65f6\u95f4\uff1a"+e.time}}),cc._RF.pop()},{}],start:[function(e,t,o){"use strict";cc._RF.push(t,"280c3rsZJJKnZ9RqbALVwtK","start"),cc.Class({extends:cc.Component,properties:{game_loading:cc.Node},onLoad:function(){this.game_loading.getComponent(cc.Animation).play(),cc.director.preloadScene("main")},startGame:function(){cc.director.loadScene("main",function(){console.log("main is loaded")})}}),cc._RF.pop()},{}],ufoGroup:[function(e,t,o){"use strict";cc._RF.push(t,"07c58NeAQVELrP3L2RCOyrA","ufoGroup");var n=cc.Class({name:"ufoG",properties:{name:"",freqTime:0,prefab:cc.Prefab,initPoolCount:0,minDelay:{default:0,tooltip:"\u6700\u5c0f\u5ef6\u8fdf"},maxDelay:{default:0,tooltip:"\u6700\u5927\u5ef6\u8fdf"}}});cc.Class({extends:cc.Component,properties:{ufoG:{default:[],type:n}},onLoad:function(){this.eState=D.commonInfo.gameState.none,D.common.batchInitObjPool(this,this.ufoG)},startAction:function(){this.eState=D.commonInfo.gameState.start;for(var e=0;e<this.ufoG.length;++e){var t=this.ufoG[e].freqTime,o="callback_"+e;this[o]=function(e){this.randNewUfo(this.ufoG[e])}.bind(this,e),this.schedule(this[o],t)}},randNewUfo:function(e){var t=Math.random()*(e.maxDelay-e.minDelay)+e.minDelay;this.scheduleOnce(function(e){this.getNewUfo(e)}.bind(this,e),t)},getNewUfo:function(e){var t=e.name+"Pool",o=D.common.genNewNode(this[t],e.prefab,this.node),n=this.getNewUfoPositon(o);o.setPosition(n)},getNewUfoPositon:function(e){var t=Math.random()*(this.node.parent.width/2-e.width/2);Math.random()<.5&&(t=-t);var o=this.node.parent.height/2+e.height/2;return cc.v2(t,o)},resumeAction:function(){this.enabled=!0,this.eState=D.commonInfo.gameState.start},pauseAction:function(){this.enabled=!1,this.eState=D.commonInfo.gameState.pause},ufoDied:function(e){D.common.backObjPool(this,e)}}),cc._RF.pop()},{}],ufo:[function(e,t,o){"use strict";cc._RF.push(t,"1e7a0zfIuJA+Kn9DAfY5544","ufo"),cc.Class({extends:cc.Component,properties:{xMinSpeed:{default:0,type:cc.Integer},xMaxSpeed:{default:0,type:cc.Integer},yMinSpeed:{default:0,type:cc.Integer},yMaxSpeed:{default:0,type:cc.Integer},getUfoClip:{default:null,type:cc.AudioClip}},onLoad:function(){cc.director.getCollisionManager().enabled=!0,this.xSpeed=Math.random()*(this.xMaxSpeed-this.xMinSpeed)+this.xMinSpeed,this.ySpeed=Math.random()*(this.yMaxSpeed-this.yMinSpeed)+this.yMinSpeed,this.ufoGroup=this.node.parent.getComponent("ufoGroup")},onCollisionEnter:function(e,t){this.node.destroy(),cc.audioEngine.playEffect(this.getUfoClip,!1)},update:function(e){this.ufoGroup.eState==D.commonInfo.gameState.start&&(this.node.x+=e*this.xSpeed,this.node.y+=e*this.ySpeed,this.node.y<-this.node.parent.height/2&&this.ufoGroup.ufoDied(this.node))}}),cc._RF.pop()},{}],"use_v2.0.x_cc.Toggle_event":[function(e,t,o){"use strict";cc._RF.push(t,"8f6ab0m7HhMsKfkB81TYojf","use_v2.0.x_cc.Toggle_event"),cc.Toggle&&(cc.Toggle._triggerEventInScript_check=!0),cc._RF.pop()},{}]},{},["bullet","bulletGroup","common","end","enemy","enemyGroup","globals","hero","historyScore","main","scoreItemTemplate","start","ufo","ufoGroup","use_v2.0.x_cc.Toggle_event"]);