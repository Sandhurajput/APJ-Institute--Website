const fs = require('fs');
const file = '/home/sama/institute/APJ-Institute--Website/client/src/pages/ContactPage.jsx';
let code = fs.readFileSync(file, 'utf8');

// Global regex replacements for colors to match #1e3a5f
code = code.replace(/cyan-300/g, '[#5984b8]'); 
code = code.replace(/cyan-400/g, '[#1e3a5f]');
code = code.replace(/cyan-500/g, '[#1e3a5f]');
code = code.replace(/cyan-600/g, '[#1e3a5f]');
code = code.replace(/cyan-700/g, '[#152842]');
code = code.replace(/cyan-800/g, '[#0f1c2e]');
code = code.replace(/cyan-900/g, '[#0f1c2e]');

// Light cyan backgrounds
code = code.replace(/cyan-50/g, '[#1e3a5f]/5');
code = code.replace(/cyan-100/g, '[#1e3a5f]/10');
code = code.replace(/cyan-200/g, '[#1e3a5f]/20');

// Blue replacements
code = code.replace(/blue-400/g, '[#2a4d75]');
code = code.replace(/blue-500/g, '[#1e3a5f]');
code = code.replace(/blue-600/g, '[#1e3a5f]');
code = code.replace(/blue-700/g, '[#152842]');

// Fix gradients
code = code.replace(/bg-gradient-to-r from-\[\#1e3a5f\] to-\[\#1e3a5f\]/g, 'bg-[#1e3a5f]');
code = code.replace(/from-\[\#1e3a5f\] to-\[\#1e3a5f\]/g, 'text-[#1e3a5f]');
code = code.replace(/text-transparent bg-clip-text text-\[\#1e3a5f\]/g, 'text-[#1e3a5f]');

// Fix rgba shadows
code = code.replace(/rgba\(34,211,238/g, 'rgba(30,58,95'); 
code = code.replace(/rgba\(37,99,235/g, 'rgba(30,58,95'); 

// Specific overrides
code = code.replace(/text-cyan-50/g, 'text-white');
code = code.replace(/text-cyan-300/g, 'text-white');

fs.writeFileSync(file, code);
console.log("Replaced colors successfully");
