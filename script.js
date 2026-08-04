/**
 * VoltPro Electrical Materials Management System
 * Vanilla JavaScript Implementation for Plain HTML/CSS/JS/Firebase websites
 */

// Default Seed Data
const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'Wires & Cables' },
  { id: 'cat-2', name: 'Switches & Sockets' },
  { id: 'cat-3', name: 'MCBs & Circuit Breakers' },
  { id: 'cat-4', name: 'Lighting & LEDs' },
  { id: 'cat-5', name: 'PVC Pipes & Conduits' },
  { id: 'cat-6', name: 'Distribution Boards' }
];

const DEFAULT_BRANDS = [
  { id: 'br-1', name: 'Polycab' },
  { id: 'br-2', name: 'Havells' },
  { id: 'br-3', name: 'Schneider Electric' },
  { id: 'br-4', name: 'Finolex' },
  { id: 'br-5', name: 'Philips' },
  { id: 'br-6', name: 'GM Modular' },
  { id: 'br-7', name: 'Legrand' },
  { id: 'br-8', name: 'Supreme' }
];

const DEFAULT_MATERIALS = [
  {
    id: 'mat-101',
    name: '1.5 sq mm Flame Retardant (FR) Copper Wire - 90m Red',
    category: 'Wires & Cables',
    brand: 'Polycab',
    model: 'Optima FR',
    size: '1.5 sq mm',
    hsnCode: '8544',
    mrp: 2150,
    sellingPrice: 1720,
    costPrice: 1450,
    stockQuantity: 45,
    minStockThreshold: 10,
    unit: 'Coil',
    stockStatus: 'In Stock',
    description: 'High purity electrolytic grade multi-strand copper wire with flame retardant PVC insulation.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    isActive: true
  },
  {
    id: 'mat-102',
    name: '2.5 sq mm Flame Retardant (FR) Copper Wire - 90m Blue',
    category: 'Wires & Cables',
    brand: 'Polycab',
    model: 'Optima FR',
    size: '2.5 sq mm',
    hsnCode: '8544',
    mrp: 3450,
    sellingPrice: 2760,
    costPrice: 2300,
    stockQuantity: 28,
    minStockThreshold: 10,
    unit: 'Coil',
    stockStatus: 'In Stock',
    description: 'Ideal for power sockets, air conditioner points, and heavy electrical appliances.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    isActive: true
  },
  {
    id: 'mat-103',
    name: '16A Single Pole (SP) C-Curve MCB 10kA',
    category: 'MCBs & Circuit Breakers',
    brand: 'Schneider Electric',
    model: 'Acti9 xC60',
    size: 'Single Pole',
    hsnCode: '8536',
    mrp: 380,
    sellingPrice: 285,
    costPrice: 220,
    stockQuantity: 6,
    minStockThreshold: 15,
    unit: 'Piece',
    stockStatus: 'Low Stock',
    description: '10kA short circuit breaking capacity MCB offering reliable protection against overload and short circuit.',
    imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600',
    isActive: true
  },
  {
    id: 'mat-104',
    name: '6A 1-Way Modular Switch White',
    category: 'Switches & Sockets',
    brand: 'Havells',
    model: 'Fabio',
    size: '1 Module',
    hsnCode: '8536',
    mrp: 65,
    sellingPrice: 48,
    costPrice: 35,
    stockQuantity: 120,
    minStockThreshold: 25,
    unit: 'Piece',
    stockStatus: 'In Stock',
    description: 'Smooth arc switch with silver cadmium contact tips for quiet operation and long electrical life.',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600',
    isActive: true
  },
  {
    id: 'mat-105',
    name: '15W Round COB Recessed LED Spotlight 3000K Warm White',
    category: 'Lighting & LEDs',
    brand: 'Philips',
    model: 'Meson',
    size: '15 Watt',
    hsnCode: '9405',
    mrp: 850,
    sellingPrice: 620,
    costPrice: 480,
    stockQuantity: 0,
    minStockThreshold: 10,
    unit: 'Piece',
    stockStatus: 'Out of Stock',
    description: 'Die-cast aluminum casing with anti-glare diffuser for residential false ceilings.',
    imageUrl: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&q=80&w=600',
    isActive: true
  },
  {
    id: 'mat-106',
    name: '25mm Heavy Gauge PVC Rigid Conduit Pipe 3m Length',
    category: 'PVC Pipes & Conduits',
    brand: 'Supreme',
    model: 'Heavy Duty',
    size: '25mm / 3m',
    hsnCode: '3917',
    mrp: 140,
    sellingPrice: 110,
    costPrice: 85,
    stockQuantity: 80,
    minStockThreshold: 20,
    unit: 'Length',
    stockStatus: 'In Stock',
    description: 'Unplasticized PVC conduit pipe for concealed wall and concrete slab electrical wiring.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    isActive: true
  }
];

// App State
let appMaterials = [];
let appCategories = [];
let appBrands = [];
let appQuotes = [];
let quoteBasket = [];

// Initialize Storage
function initVoltProStore() {
  const storedMat = localStorage.getItem('voltpro_materials');
  if (storedMat) {
    appMaterials = JSON.parse(storedMat);
  } else {
    appMaterials = DEFAULT_MATERIALS;
    localStorage.setItem('voltpro_materials', JSON.stringify(appMaterials));
  }

  const storedCat = localStorage.getItem('voltpro_categories');
  if (storedCat) {
    appCategories = JSON.parse(storedCat);
  } else {
    appCategories = DEFAULT_CATEGORIES;
    localStorage.setItem('voltpro_categories', JSON.stringify(appCategories));
  }

  const storedBr = localStorage.getItem('voltpro_brands');
  if (storedBr) {
    appBrands = JSON.parse(storedBr);
  } else {
    appBrands = DEFAULT_BRANDS;
    localStorage.setItem('voltpro_brands', JSON.stringify(appBrands));
  }

  const storedQ = localStorage.getItem('voltpro_quotes');
  if (storedQ) {
    appQuotes = JSON.parse(storedQ);
  } else {
    appQuotes = [];
  }
}

// Global Store Save Helpers
function saveMaterialsState(materials) {
  appMaterials = materials;
  localStorage.setItem('voltpro_materials', JSON.stringify(appMaterials));
  
  if (typeof db !== 'undefined' && db) {
    materials.forEach(m => {
      db.collection('materials').doc(m.id).set(m, { merge: true }).catch(err => console.error(err));
    });
  }
}

function saveQuoteRequest(quoteData) {
  appQuotes.unshift(quoteData);
  localStorage.setItem('voltpro_quotes', JSON.stringify(appQuotes));

  if (typeof db !== 'undefined' && db) {
    db.collection('quote_requests').doc(quoteData.id).set(quoteData).catch(err => console.error(err));
  }
}

// Quote Basket Helper
function addToQuoteBasket(material) {
  const existing = quoteBasket.find(i => i.material.id === material.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    quoteBasket.push({ material, quantity: 1 });
  }
  updateQuoteCounterUI();
  alert(`Added "${material.name}" to your Quote Basket!`);
}

function updateQuoteCounterUI() {
  const badge = document.getElementById('quote-basket-badge');
  if (badge) {
    badge.innerText = quoteBasket.length;
    if (quoteBasket.length > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

// Export CSV
function exportMaterialsCSV(materialsList) {
  if (!materialsList || materialsList.length === 0) {
    alert("No materials to export.");
    return;
  }
  const headers = ['ID', 'Name', 'Category', 'Brand', 'Model', 'Size', 'HSN Code', 'MRP', 'Selling Price', 'Cost Price', 'Stock Qty', 'Unit', 'Stock Status', 'Active'];
  const rows = materialsList.map(m => [
    `"${m.id}"`,
    `"${m.name.replace(/"/g, '""')}"`,
    `"${m.category}"`,
    `"${m.brand}"`,
    `"${m.model || ''}"`,
    `"${m.size || ''}"`,
    `"${m.hsnCode || ''}"`,
    m.mrp,
    m.sellingPrice,
    m.costPrice || 0,
    m.stockQuantity,
    `"${m.unit}"`,
    `"${m.stockStatus}"`,
    m.isActive ? 'TRUE' : 'FALSE'
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `VoltPro_Materials_Export_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Print PDF Report
function printMaterialsReport(materialsList) {
  const win = window.open('', '_blank');
  if (!win) return;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>VoltPro Electrical Materials Report</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #111; }
          h1 { margin-bottom: 5px; color: #d97706; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #1e293b; color: white; }
          .price { text-align: right; }
          .center { text-align: center; }
        </style>
      </head>
      <body>
        <h1>VoltPro Electrical Inventory Report</h1>
        <p>Generated on: ${new Date().toLocaleString()} | Total Items: ${materialsList.length}</p>
        <table>
          <thead>
            <tr>
              <th>Material Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>HSN</th>
              <th class="price">Selling Price</th>
              <th class="center">Stock</th>
              <th class="center">Status</th>
            </tr>
          </thead>
          <tbody>
            ${materialsList.map(m => `
              <tr>
                <td><strong>${m.name}</strong><br><small>${m.size || ''}</small></td>
                <td>${m.category}</td>
                <td>${m.brand}</td>
                <td>${m.hsnCode || '-'}</td>
                <td class="price">₹${m.sellingPrice}</td>
                <td class="center">${m.stockQuantity} ${m.unit}</td>
                <td class="center">${m.stockStatus}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <script>window.onload = function() { window.print(); }</script>
      </body>
    </html>
  `;
  win.document.write(html);
  win.document.close();
}

// Boot System
document.addEventListener('DOMContentLoaded', () => {
  initVoltProStore();
  updateQuoteCounterUI();
  console.log("⚡ VoltPro Materials Management Script Loaded.");
});
