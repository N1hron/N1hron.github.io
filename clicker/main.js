(()=>{"use strict";window.addEventListener("DOMContentLoaded",(function(){var e=document.querySelector(".clicker__btn-start"),t=document.querySelector(".clicker__timer"),n=document.querySelector(".clicker__zone"),c=document.querySelector(".clicker__score"),s=document.querySelector(".statistics__time"),o=document.querySelector(".statistics__score"),r=document.querySelector(".statistics__cps"),l=document.querySelector(".clicker__cps"),a=function(){var e=document.createElement("div");return e.classList.add("target"),e.style.display="none",e}(),d={startTime:3e4,current:0,passed:0,minutesLeft:0,secondsLeft:0,minutesPassed:0,secondsPassed:0,onlySeconds:0,left:0,score:0,intervalId:null,intervalCpsId:null,clicksPerSecond:0};function i(){u(),s.textContent="".concat(d.minutesPassed,":").concat(d.secondsPassed),o.textContent=d.score,r.textContent=d.clicksPerSecond,clearInterval(d.intervalId),d.intervalId=null,clearInterval(d.intervalCpsId),d.intervalCpsId=null,a.style.display="none",e.textContent="START",d.score=0,c.textContent="SCORE: "+d.score,d.clicksPerSecond="0.00",l.textContent="CPS: "+d.clicksPerSecond,f(d.startTime)}function u(){0!=d.onlySeconds?d.clicksPerSecond=(d.score/d.onlySeconds).toFixed(2):d.clicksPerSecond="0.00"}function f(e){d.minutesLeft=p(Math.floor(e/6e4)),d.secondsLeft=p(Math.floor(e%6e4/1e3)),t.textContent="".concat(d.minutesLeft," : ").concat(d.secondsLeft)}function m(e){d.score+=e,c.textContent="SCORE: "+d.score}function S(){a.style.left=v(),a.style.bottom=v()}function v(){return Math.floor(482*Math.random()+15)-15+"px"}function p(e){return(e+"").length<2?"0"+e:e}n.appendChild(a),f(d.startTime),n.addEventListener("click",(function(e){e.target==a?d.intervalId&&(m(1),S()):d.intervalId&&m(-1)})),e.addEventListener("click",(function(){var t;d.intervalId?i():(t=Date.parse(new Date),d.intervalCpsId=setInterval((function(){u(),l.textContent="CPS: "+d.clicksPerSecond}),100),d.intervalId=setInterval((function(){d.current=Date.parse(new Date),d.passed=d.current-t,d.left=d.startTime-d.passed,d.onlySeconds=Math.floor(d.passed/1e3),d.minutesPassed=p(Math.floor(d.passed/6e4)),d.secondsPassed=p(Math.floor(d.passed%6e4/1e3)),d.passed>=d.startTime?i():f(d.left)}),1e3),S(),a.style.display="block",e.textContent="STOP")}))}))})();