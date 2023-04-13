export const initMouseflow = () => {
  window['_mfq'] = window['_mfq'] || []
  const mf = document.createElement('script')
  mf.type = 'text/javascript'
  mf.defer = true
  mf.src = '//cdn.mouseflow.com/projects/2fc56308-8956-468d-a67c-76188ccaf385.js'
  document.getElementsByTagName('head')[0].appendChild(mf)
}
