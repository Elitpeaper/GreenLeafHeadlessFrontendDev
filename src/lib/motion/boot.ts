/**
 * Inline boot script (runs before first paint, rendered by <MotionRoot />). Sets on <html>:
 *  - data-motion="on"        full motion — the DEFAULT (K-264). The OS "reduce motion" setting no longer decides the tier.
 *                            All hidden start states in motion.css hang off this value, so without JS nothing is hidden.
 *  - data-motion="reduced"   gentle tier: the visitor chose "Hareketi azalt" in the footer (localStorage gl-motion=reduced),
 *                            or the ?motion=reduced preview switch. Nothing travels, scales or loops; hover feedback stays
 *                            visible through opacity/colour only.
 *  - (no attribute)          ?motion=off — everything static (LCP comparison baseline).
 *  - data-motion-first       first page view of the session (H1/M-1 stripe draw plays once per session)
 *  - data-recolor-header     showcase hover also recolours the header band (K-093 preview option)
 *  - data-intro              full document load: the K-233 home hero intro may play (removed on the first client navigation)
 *
 * Sources, strongest first (single source for every gate, see preference.ts):
 *   1. ?motion=off|reduced|on|full preview switch (sessionStorage gl-motion-preview; ?motion=auto clears it)
 *   2. the visitor's footer choice (localStorage gl-motion = "reduced" | "on")
 *   3. default "on"
 */
export const motionBootScript = `(function(){try{var d=document.documentElement,q=new URLSearchParams(location.search),s=window.sessionStorage,l=window.localStorage;var h=q.get('recolorHeader');if(h!==null)s.setItem('gl-recolor-header',h);if(s.getItem('gl-recolor-header')!=='0')d.setAttribute('data-recolor-header','');d.setAttribute('data-intro','');var p=q.get('motion');if(p!==null){if(p==='auto')s.removeItem('gl-motion-preview');else s.setItem('gl-motion-preview',p)}var m=s.getItem('gl-motion-preview')||l.getItem('gl-motion')||'on';if(m==='off')return;d.setAttribute('data-motion',m==='reduced'?'reduced':'on');if(!s.getItem('gl-motion-seen')){d.setAttribute('data-motion-first','');s.setItem('gl-motion-seen','1')}}catch(e){document.documentElement.setAttribute('data-motion','on')}})();`;
