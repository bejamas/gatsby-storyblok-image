var t,e=require("path"),a=(t=e)&&"object"==typeof t&&"default"in t?t.default:t,i=/^\/\/a.storyblok.com\/f\/[0-9]+\/[0-9]+x[0-9]+\/[A-Za-z0-9]+\/[\S]+\.[a-z]+/;function s(t){var e=null,a=null;if("string"==typeof t&&(e=t),"object"==typeof t&&(e=t.image,a=t.base64?t.base64:null),!(e=i.test(e)?e:null))return!1;var s=e.replace("//a.storyblok.com/",""),r=s.split("/"),n=r[4],o=r[2].split("x").map(function(t){return parseInt(t,10)}),c=o[0],l=o[1];return{originalPath:s,extension:n.split(".")[1],metadata:{dimensions:{width:c,height:l,aspectRatio:c/l},lqip:a}}}var r="https://img2.storyblok.com",n=a.resolve(".cache/storyblok/assets/"),o=[1,1.5,2,3],c=[.25,.5,1,1.5,2,3],l={quality:100,smartCrop:!0,format:null,fill:null,toFormat:null,base64:null,useBase64:!0},u=Object.assign({},l,{maxWidth:800,maxHeight:null}),p=Object.assign({},l,{width:400,height:null});function b(t){var e=t.includes("filters:format(webp)"),a=/[a-f0-9]+-\d+x\d+\.webp/.test(t);return e||a}function h(t,e){return void 0===e&&(e=""),t.map(function(t){var a=t.split(" "),i=a[1];return"/static/"+i+"--"+a[0].split("/").slice(-1)+e+" "+i}).join(",\n")}function f(t,e){var a=e.width,i=e.height,s=e.smartCrop,n=e.quality,o=e.format,c=e.fill,l=t.split("."),u=r;a&&i&&(u+="/"+a+"x"+i),s&&(u+="/smart");var p=[n&&"quality:("+n+")",o&&o!==l[1]&&"format:("+o+")",c&&"fill:("+c+")"];return(p=p.filter(function(t){return!0===Boolean(t)})).length>0&&(u+=function(t){return t.reduce(function(t,e,a){return t+":"+e},"/filters")}(p)),u+"/"+t}function m(t){var a=t.imageName,i=t.src,s=t.srcWebp,r=t.srcSets;if("undefined"==typeof window){var o=require("fs-extra"),c=e.resolve(n+"/"+a);o.pathExists(c+".json").then(function(t){t||o.writeJsonSync(c+".json",{name:a,src:i,srcSet:r.base,srcWebp:s,srcSetWebp:r.webp})})}}exports.getFixedGatsbyImage=function(t,e){void 0===e&&(e={});var a=s(t);if(!a)return null;var i=Object.assign({},p,e),r=i.width,n=i.height,c=a.metadata.dimensions,l=a.originalPath,u=c.aspectRatio;i.height&&(u=r/i.height);var d=null;i.toFormat?d=i.toFormat:b(l)&&(d="jpg");var g,w,v,j,x=o.map(function(t){return Math.round(r*t)}).filter(function(t){return t<c.width}).reduce(function(t,e,a){var s=o[a]+"x",r=Math.round(e/u),n=Object.assign({},i,{width:e,height:r}),c=f(l,Object.assign({},n,{format:"webp"})),p=f(l,Object.assign({},n,d&&{format:d}));return t.webp.push(c+" "+s),t.base.push(p+" "+s),t},{webp:[],base:[]}),O=Math.round(n||r/u),y=Object.assign({},i,{width:r,height:O}),S=f(l,Object.assign({},y,d&&{format:d})),W=f(l,Object.assign({},y,{format:"webp"}));if("production"===process.env.NODE_ENV&&i.saveLocal){var F=S.split(" ")[0].split("/").slice(-1);m({imageName:F,src:S,srcSets:x,srcWebp:W}),g="/static/"+F,w=h(x.base),v="/static/"+F+".webp",j=h(x.base,".webp")}else g=S,w=x.base.join(",\n")||null,v=W,j=x.webp.join(",\n")||null;return{base64:t.base64||null,aspectRatio:u,width:Math.round(r),height:O,src:g,srcSet:w,srcWebp:v,srcSetWebp:j}},exports.getFluidGatsbyImage=function(t,e){void 0===e&&(e={});var a=s(t);if(!a)return null;var i=Object.assign({},u,e),r=i.maxWidth,n=a.metadata.dimensions,o=a.originalPath,l=n.aspectRatio;i.maxHeight&&(l=r/i.maxHeight);var p=i.maxHeight||Math.round(r/n.aspectRatio),d=null;i.toFormat?d=i.toFormat:b(o)&&(d="jpg");var g,w,v,j,x=i.sizes||"(max-width: "+r+"px) 100vw, "+r+"px",O=c.map(function(t){return Math.round(r*t)}).filter(function(t){return t<n.width}).concat(n.width).filter(function(t){return t<n.width}).reduce(function(t,e){var a={width:e,height:Math.round(e/l)},s=f(o,Object.assign({},i,a,{format:"webp"})),r=f(o,Object.assign({},i,a,{format:d}));return t.webp.push(s+" "+e+"w"),t.base.push(r+" "+e+"w"),t},{webp:[],base:[]}),y={width:r,height:p},S=f(o,Object.assign({},i,y,{format:d})),W=f(o,Object.assign({},i,y,{format:"webp"}));if("production"===process.env.NODE_ENV&&i.saveLocal){var F=S.split(" ")[0].split("/").slice(-1);m({imageName:F,src:S,srcSets:O,srcWebp:W}),g="/static/"+F,w=h(O.base),v="/static/"+F+".webp",j=h(O.base,".webp")}else g=S,w=O.base.join(",\n")||null,v=W,j=O.webp.join(",\n")||null;return{base64:t.base64||null,aspectRatio:l,src:g,srcSet:w,srcWebp:v,srcSetWebp:j,sizes:x}};
//# sourceMappingURL=index.js.map
