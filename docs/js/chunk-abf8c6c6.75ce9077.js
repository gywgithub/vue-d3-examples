(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-abf8c6c6"],{"386b":function(t,e,i){var n=i("5ca1"),a=i("79e5"),r=i("be13"),s=/"/g,o=function(t,e,i,n){var a=String(r(t)),o="<"+e;return""!==i&&(o+=" "+i+'="'+String(n).replace(s,"&quot;")+'"'),o+">"+a+"</"+e+">"};t.exports=function(t,e){var i={};i[t]=e(o),n(n.P+n.F*a((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3})),"String",i)}},5313:function(t){t.exports=JSON.parse('{"nodes":[{"id":"Myriel","group":1},{"id":"Napoleon","group":2},{"id":"Feuilly","group":3}],"links":[{"source":"Myriel","target":"Napoleon","value":1},{"source":"Napoleon","target":"Feuilly","value":2},{"source":"Feuilly","target":"Myriel","value":3}]}')},"70ca":function(t,e,i){},"7aa5":function(t,e,i){"use strict";var n=i("70ca"),a=i.n(n);a.a},ac6a:function(t,e,i){for(var n=i("cadf"),a=i("0d58"),r=i("2aba"),s=i("7726"),o=i("32e9"),l=i("84f2"),c=i("2b4c"),u=c("iterator"),h=c("toStringTag"),d=l.Array,f={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},g=a(f),p=0;p<g.length;p++){var v,b=g[p],L=f[b],k=s[b],x=k&&k.prototype;if(x&&(x[u]||o(x,u,d),x[h]||o(x,h,b),l[b]=d,L))for(v in n)x[v]||r(x,v,n[v],!0)}},b54a:function(t,e,i){"use strict";i("386b")("link",(function(t){return function(e){return t(this,"a","href",e)}}))},ce4c:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"force-base-iii"},[i("h2",[t._v("Force-based label placement III")]),i("svg",{staticClass:"container-border",attrs:{id:"viz"}})])},a=[],r=(i("b54a"),i("75fc")),s=(i("ac6a"),i("5698")),o=i("5313"),l={name:"ForceBasedLabelPlacement",data:function(){return{color:null,graph:null,label:null,labelLayout:null,graphLayout:null,width:1250,height:800,adjlist:[],svg:null,container:null,link:null,node:null,labelNode:null}},mounted:function(){var t=this,e=this;this.color=s["u"](s["v"]),this.graph=o,this.label={nodes:[],links:[]},this.graph.nodes.forEach((function(t,i){e.label.nodes.push({node:t}),e.label.nodes.push({node:t}),e.label.links.push({source:2*i,target:2*i+1})})),this.graphLayout=s["h"](this.graph.nodes).force("charge",s["g"]().strength(-500)).force("x",s["i"](this.width/2)).force("y",s["j"](this.height/2)).force("link",s["f"](this.graph.links).id((function(t){return t.id})).distance(100)).on("tick",e.ticked),this.graph.links.forEach((function(t){e.adjlist[t.source.index+"-"+t.target.index]=!0,e.adjlist[t.target.index+"-"+t.source.index]=!0})),this.svg=s["w"]("#viz").attr("width",this.width).attr("height",this.height),this.container=this.svg.append("g"),this.svg.call(s["A"]().scaleExtent([.8,4]).on("zoom",(function(){e.container.attr("transform",s["d"].transform)}))),this.link=this.container.append("g").attr("class","links").selectAll("line"),e.node=this.container.append("g").attr("class","nodes").selectAll("g"),this.labelNode=this.container.append("g").attr("class","labelNodes").selectAll("text"),this.restart(),setTimeout((function(){var e=[{id:"Four",group:4},{id:"Five",group:5}],i=[{source:"Four",target:"Five",value:3},{source:"Five",target:"Feuilly",value:4}];t.graph.nodes=[].concat(Object(r["a"])(t.graph.nodes),e),t.graph.links=[].concat(Object(r["a"])(t.graph.links),i),t.restart()}),1e3)},methods:{restart:function(){var t=this;this.node=this.node.data(this.graph.nodes,(function(t){return t.id})),this.node.exit().remove(),this.node=this.node.enter().append("circle").attr("fill",(function(e){return t.color(e.id)})).attr("r",5).merge(this.node),this.link=this.link.data(this.graph.links,(function(t){return t.source.id+"-"+t.target.id})),this.link.exit().remove(),this.link=this.link.enter().append("line").merge(this.link),this.labelNode=this.labelNode.data(this.graph.nodes,(function(t){return t.id})),this.labelNode.exit().remove(),this.labelNode=this.labelNode.enter().append("text").merge(this.labelNode).text((function(t){return t.id})).style("fill","#555").style("font-size",12).style("pointer-events","none"),this.graphLayout.nodes(this.graph.nodes),this.graphLayout.force("link").links(this.graph.links)},ticked:function(){var t=this;t.node.call(t.updateNode),t.link.call(t.updateLink),t.labelNode.each((function(e,i){if(i%2===0);else{var n=this.getBBox(),a=e.x-e.x,r=e.y-e.y,s=Math.sqrt(a*a+r*r),o=n.width*(a-s)/(2*s);o=Math.max(-n.width,Math.min(0,o));var l=16;this.setAttribute("transform","translate("+t.fixna(o)+","+l+")")}})),t.labelNode.call(t.updateNode)},updateLink:function(){var t=this;t.link.attr("x1",(function(e){return t.fixna(e.source.x)})).attr("y1",(function(e){return t.fixna(e.source.y)})).attr("x2",(function(e){return t.fixna(e.target.x)})).attr("y2",(function(e){return t.fixna(e.target.y)}))},updateNode:function(t){var e=this;t.attr("transform",(function(t){return"translate("+e.fixna(t.x)+","+e.fixna(t.y)+")"}))},fixna:function(t){return isFinite(t)?t:0}}},c=l,u=(i("7aa5"),i("2877")),h=Object(u["a"])(c,n,a,!1,null,null,null);e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-abf8c6c6.75ce9077.js.map