var t=/^(https?:)?\/\/a.storyblok.com\/f\/[0-9]+\/[0-9]+x[0-9]+\/[A-Za-z0-9]+\/[\S]+\.[a-z]+/;function e(e){var a=null,n=null;if("string"==typeof e&&(a=e),"object"==typeof e&&("asset"===e.fieldtype?a=e.filename:(a=e.image,n=e.base64?e.base64:null)),!(a=t.test(a)?a:null))return!1;var i=a.replace(/^(https?:)?\/\/a.storyblok.com\//,""),r=i.split("/"),s=r[4],o=r[2].split("x").map(function(t){return parseInt(t,10)}),u=o[0],l=o[1];return{originalPath:i,extension:s.split(".")[1],metadata:{dimensions:{width:u,height:l,aspectRatio:u/l},lqip:n}}}var a="https://img2.storyblok.com",n=[1,1.5,2,3],i=[.25,.5,1,1.5,2,3],r={quality:100,smartCrop:!0,format:null,fill:null,toFormat:null,base64:null,useBase64:!0},s=Object.assign({},r,{maxWidth:800,maxHeight:null}),o=Object.assign({},r,{width:400,height:null});function u(t){var e=t.includes("filters:format(webp)"),a=/[a-f0-9]+-\d+x\d+\.webp/.test(t);return e||a}function l(t,e){var n=e.width,i=e.height,r=e.smartCrop,s=e.quality,o=e.format,u=e.fill,l=t.split("."),h=a;n&&i&&(h+="/"+n+"x"+i),r&&(h+="/smart");var c=[s&&"quality("+s+")",o&&o!==l[1]&&"format("+o+")",u&&"fill("+u+")"];return(c=c.filter(function(t){return!0===Boolean(t)})).length>0&&(h+=function(t){return t.reduce(function(t,e,a){return t+":"+e},"/filters")}(c)),h+"/"+t}function h(t,a){void 0===a&&(a={});var i=e(t);if(!i)return null;var r=Object.assign({},o,a),s=r.width,h=r.height,c=r.base64,p=r.useBase64,b=i.metadata,f=b.dimensions,m=b.lqip,d=i.originalPath,g=f.aspectRatio;r.height&&(g=s/r.height);var w=null;r.toFormat?w=r.toFormat:u(d)&&(w="jpg");var j=n.map(function(t){return Math.round(s*t)}).filter(function(t){return t<f.width}).reduce(function(t,e,a){var i=n[a]+"x",s=Math.round(e/g),o=Object.assign({},r,{width:e,height:s}),u=l(d,Object.assign({},o,{format:"webp"})),h=l(d,Object.assign({},o,w&&{format:w}));return t.webp.push(u+" "+i),t.base.push(h+" "+i),t},{webp:[],base:[]}),v=Math.round(h||s/g),x=Object.assign({},r,{width:s,height:v}),O=l(d,Object.assign({},x,w&&{format:w})),y=l(d,Object.assign({},x,{format:"webp"}));return{base64:p?c||m:null,aspectRatio:g,width:Math.round(s),height:v,src:O,srcWebp:y,srcSet:j.base.join(",\n")||null,srcSetWebp:j.webp.join(",\n")||null}}function c(t,a){void 0===a&&(a={});var n=e(t);if(!n)return null;var r=Object.assign({},s,a),o=r.maxWidth,h=r.base64,c=r.useBase64,p=n.metadata,b=p.dimensions,f=p.lqip,m=n.originalPath,d=b.aspectRatio;r.maxHeight&&(d=o/r.maxHeight);var g=r.maxHeight||Math.round(o/b.aspectRatio),w=null;r.toFormat?w=r.toFormat:u(m)&&(w="jpg");var j=r.sizes||"(max-width: "+o+"px) 100vw, "+o+"px",v=i.map(function(t){return Math.round(o*t)}).filter(function(t){return t<b.width}).concat(b.width).filter(function(t){return t<b.width}).reduce(function(t,e){var a={width:e,height:Math.round(e/d)},n=l(m,Object.assign({},r,a,{format:"webp"})),i=l(m,Object.assign({},r,a,{format:w}));return t.webp.push(n+" "+e+"w"),t.base.push(i+" "+e+"w"),t},{webp:[],base:[]}),x={width:o,height:g},O=l(m,Object.assign({},r,x,{format:w})),y=l(m,Object.assign({},r,x,{format:"webp"}));return{base64:c?h||f:null,aspectRatio:d,src:O,srcWebp:y,srcSet:v.base.join(",\n")||null,srcSetWebp:v.webp.join(",\n")||null,sizes:j}}export{h as getFixedGatsbyImage,c as getFluidGatsbyImage};
//# sourceMappingURL=index.mjs.map
