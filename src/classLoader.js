// Note: requires jspm CDN to be loaded so that SystemJS polyfills System.module
export default async function(code) {
  let mod = await System.module(code);
  return mod.default;
}
