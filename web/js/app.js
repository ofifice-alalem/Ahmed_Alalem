function escapeHtml(s){
  if(s==null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Robust getter: try candidate keys, with/without BOM (\uFEFF), and case variants
// Consolidated getVal: accepts either an array of candidate keys or multiple key args.
function getVal(obj, ...keys){
  if(!obj) return undefined;
  // allow passing an array as the second argument
  let candidates = keys;
  if(candidates.length === 1 && Array.isArray(candidates[0])) candidates = candidates[0];
  const BOM = '\uFEFF';
  for(const candRaw of candidates){
    const cand = String(candRaw || '');
    if(cand in obj) return obj[cand];
    if((BOM + cand) in obj) return obj[BOM + cand];
    const up = cand.toUpperCase();
    if(up in obj) return obj[up];
    if((BOM + up) in obj) return obj[BOM + up];
    const low = cand.toLowerCase();
    if(low in obj) return obj[low];
    if((BOM + low) in obj) return obj[BOM + low];
  }
  // fallback: return first value in object if present
  const allKeys = Object.keys(obj);
  return allKeys.length ? obj[allKeys[0]] : undefined;
}

function parseNumber(v){
  if(v==null) return 0;
  const s = String(v).trim();
  if(s === '' || s.toUpperCase() === 'NULL') return 0;
  // remove commas and any non numeric except dot and minus
  const cleaned = s.replace(/,/g, '').replace(/[^0-9.\-]/g, '');
  const n = parseFloat(cleaned);
  return isNaN(n) ? 0 : n;
}

function formatNumber(n){
  return n.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
}

function formatTableNumber(value) {
  const num = parseNumber(value);
  return num === 0 ? value : formatNumber(num);
}

// (consolidated above)
