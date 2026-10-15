export const MODE_KEY = 'rg-mode'

/**
 * Inlined into <head>. A `?mode=` link wins, then a visitor's saved choice,
 * otherwise desktop opens
 * in the terminal and phones open in the graphical page, where a keyboard
 * driven shell would be a chore.
 */
export const modeScript = `(function(){try{var q=new URLSearchParams(location.search).get('mode');var m=q==='gui'?'graphical':q||localStorage.getItem('${MODE_KEY}');if(m!=='terminal'&&m!=='graphical'){m=window.matchMedia('(min-width: 768px)').matches?'terminal':'graphical'}document.documentElement.setAttribute('data-mode',m)}catch(e){document.documentElement.setAttribute('data-mode','graphical')}})()`
