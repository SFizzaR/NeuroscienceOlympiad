// --- Crossword Layout & Medical Database ---
const crosswordData = {
  width: 27,
  height: 30,
  words: [
    {
      length: 11,
      clue: "A seahorse-shaped structure critical for memory consolidation and spatial navigation.",
      x: 7,
      y: 15,
      dir: "across",
      definition: "A bilateral limbic structure located within the medial temporal lobe, essential for declarative memory consolidation and spatial mapping.",
      context: "Extensively damaged early in Alzheimer's disease, leading to short-term memory loss. Also a primary focus in Mesial Temporal Lobe Epilepsy (MTLE), often presenting with hippocampal sclerosis."
    },
    {
      length: 10,
      clue: "The hindbrain structure essential for coordinating voluntary movement, balance, and motor learning.",
      x: 12,
      y: 15,
      dir: "down",
      definition: "A highly folded structure at the base of the brain, containing more neurons than the rest of the brain combined, responsible for motor control and correction.",
      context: "Pathology results in cerebellar ataxia, characterized by gait instability, dysmetria, intention tremor, and dysdiadochokinesia. Frequently affected by strokes, chronic alcohol abuse, or tumors like medulloblastomas."
    },
    {
      length: 9,
      clue: "A monoamine neurotransmitter that regulates mood, sleep, appetite, and emotional states.",
      x: 8,
      y: 8,
      dir: "down",
      definition: "5-Hydroxytryptamine (5-HT), synthesized from the amino acid tryptophan, primarily in the raphe nuclei of the brainstem.",
      context: "Targeted by SSRIs for depression and anxiety. Excess serotonin leads to Serotonin Syndrome, characterized by autonomic instability, cognitive changes, and neuromuscular excitability (clonus)."
    },
    {
      length: 7,
      clue: "A language impairment affecting comprehension or production, often resulting from left hemisphere damage.",
      x: 10,
      y: 14,
      dir: "down",
      definition: "A cognitive linguistic impairment that compromises speech production, comprehension, reading, or writing, separate from mechanical speech disorders.",
      context: "Most commonly caused by ischemic stroke in the left Middle Cerebral Artery (MCA) territory. Major types include Broca's (non-fluent, expressive) and Wernicke's (fluent, receptive, jargon-heavy)."
    },
    {
      length: 8,
      clue: "A chronic neurological disorder marked by recurrent, unprovoked seizures due to abnormal electrical activity.",
      x: 15,
      y: 14,
      dir: "down",
      definition: "A disorder of the brain characterized by an enduring predisposition to generate epileptic seizures, which are hypersynchronous electrical discharges.",
      context: "Diagnosed with EEG. Managed via antiseizure medications (ASMs) targeting sodium, calcium, or GABA channels. Refractory cases may undergo surgical resection or neurostimulation (VNS, RNS)."
    },
    {
      length: 10,
      clue: "A neuromuscular disorder characterized by weakness in skeletal muscles, caused by antibodies blocking ACh receptors.",
      x: 13,
      y: 6,
      dir: "down",
      definition: "Myasthenia Gravis (MG), a chronic autoimmune disorder affecting the neuromuscular junction.",
      context: "Antibodies block or destroy nicotinic acetylcholine receptors (AChR) on the post-synaptic membrane. Presents with fatiguable ptosis, diplopia, and bulbar weakness. Treated with pyridostigmine (AChE inhibitor) and immunosuppressants."
    },
    {
      length: 9,
      clue: "Resident macrophage-like immune cells of the central nervous system that clear cellular debris.",
      x: 6,
      y: 22,
      dir: "across",
      definition: "Specialized myeloid-derived glial cells that act as the active immune defense, surveillance, and synaptic pruning cells in the CNS.",
      context: "In chronic neurodegenerative diseases like Alzheimer's, dysregulated microglia become chronically active, releasing pro-inflammatory cytokines that exacerbate neuronal injury."
    },
    {
      length: 9,
      clue: "A neurodegenerative disease marked by amyloid plaques, tau tangles, and severe cortical atrophy.",
      x: 6,
      y: 24,
      dir: "across",
      definition: "The most common form of progressive dementia, showing cortical loss, amyloid-beta extracellular plaques, and intracellular hyperphosphorylated tau neurofibrillary tangles.",
      context: "Presents initially with episodic memory impairment, progressing to global cognitive decline. Current diagnostic markers include CSF amyloid/tau ratios and amyloid PET imaging."
    },
    {
      length: 6,
      clue: "The outer layer of folded gray matter in the cerebrum responsible for high-level information processing.",
      x: 4,
      y: 9,
      dir: "across",
      definition: "The sheet of neural tissue outermost to the cerebrum, organized in six distinct histological layers (neocortex).",
      context: "Contains areas for primary sensory processing, motor execution, and association areas. Atrophy or focal lesions result in specific neuropsychological syndromes (e.g., apraxia, agnosia, executive dysfunction)."
    },
    {
      length: 10,
      clue: "A sensory receptor specialized in detecting noxious, pain-inducing stimuli.",
      x: 0,
      y: 11,
      dir: "across",
      definition: "Free nerve endings of primary afferent A-delta (myelinated, fast pain) and C (unmyelinated, slow pain) fibers.",
      context: "Activated by chemical (capsaicin, protons), mechanical, or thermal stimuli. Sensitized by prostaglandins and substance P in tissue injury (hyperalgesia). Blocked by local anesthetics and modulated by opioids."
    },
    {
      length: 8,
      clue: "An almond-shaped temporal lobe structure key to emotional processing, fear conditioning, and threat detection.",
      x: 3,
      y: 20,
      dir: "across",
      definition: "A collection of nuclei deep in the temporal lobe, acting as the emotional hub of the limbic system.",
      context: "Bilateral destruction (e.g., from herpes simplex encephalitis) causes Klüver-Bucy Syndrome, which includes placidity, hyperorality, hypersexuality, and visual agnosia."
    },
    {
      length: 9,
      clue: "The primary excitatory neurotransmitter in the central nervous system.",
      x: 14,
      y: 17,
      dir: "across",
      definition: "The most abundant neurotransmitter in the brain, binding to ionotropic receptors (NMDA, AMPA, Kainate) and metabotropic GPCRs.",
      context: "Excessive synaptic glutamate concentration leads to calcium overload and excitotoxicity, a major driver of neuronal death in acute stroke, traumatic brain injury, and amyotrophic lateral sclerosis (ALS)."
    },
    {
      length: 6,
      clue: "A primary brain tumor originating in the glial support cells.",
      x: 9,
      y: 6,
      dir: "across",
      definition: "An intracranial neoplasm originating from astrocytic, oligodendroglial, or ependymal cell lineages.",
      context: "Classified from grade I to IV. Glioblastoma Multiforme (GBM, grade IV) is the most aggressive form, showing microvascular proliferation, pseudopalisading necrosis, and extreme invasiveness."
    },
    {
      length: 8,
      clue: "An umbrella term for progressive cognitive decline affecting memory, reasoning, and daily function.",
      x: 12,
      y: 12,
      dir: "across",
      definition: "A clinical syndrome characterized by a persistent and progressive loss of cognitive capacity that interferes with occupational or social activities.",
      context: "Etiologies include Alzheimer's, Vascular dementia, Frontotemporal lobar degeneration, and Dementia with Lewy bodies (distinguished by visual hallucinations and parkinsonism)."
    },
    {
      length: 9,
      clue: "One of the communicating cavities in the brain filled with cerebrospinal fluid.",
      x: 10,
      y: 10,
      dir: "across",
      definition: "Interconnected cavities (lateral, third, and fourth ventricles) lined by ependymal cells where CSF is circulated.",
      context: "Choroid plexus inside ventricles secretes CSF. Blockage of drainage paths (like the aqueduct of Sylvius) causes obstructive hydrocephalus. Normal Pressure Hydrocephalus (NPH) presents with the triad: wet, wobbly, and wacky."
    },
    {
      length: 9,
      clue: "A neurodegenerative disease affecting the substantia nigra, leading to tremors, rigidity, and bradykinesia.",
      x: 1,
      y: 13,
      dir: "across",
      definition: "A hypokinetic movement disorder characterized by loss of pigmented dopaminergic neurons in the substantia nigra pars compacta.",
      context: "Presents with pill-rolling resting tremor, cogwheel rigidity, bradykinesia, and postural instability. Histology shows Lewy bodies composed of alpha-synuclein aggregates. Managed with Levodopa/Carbidopa."
    },
    {
      length: 9,
      clue: "A star-shaped glial cell crucial for nutrient support, metabolic homeostasis, and maintaining the blood-brain barrier.",
      x: 14,
      y: 20,
      dir: "across",
      definition: "The most abundant glial cell type in the CNS, with processes that wrap synapses, support metabolic pathways, and form end-feet on capillaries.",
      context: "Maintains synaptic glutamate levels and extracellular potassium. Undergoes reactive astrogliosis and forms the glial scar after mechanical injury or stroke, serving as both a physical barrier and inhibitor of axonal regrowth."
    },
    {
      length: 8,
      clue: "A branched protoplasmic extension of a nerve cell that receives signals from other neurons.",
      x: 21,
      y: 11,
      dir: "down",
      definition: "The receptive field projection of a neuron, characterized by high concentrations of ligand-gated ion channels and dendritic spines.",
      context: "Dendritic spine density decreases with aging and is severely altered in neurodevelopmental disorders like fragile X syndrome, contributing to impaired synaptic plasticity."
    },
    {
      length: 8,
      clue: "The three protective membranes (dura, arachnoid, and pia mater) enveloping the brain and spinal cord.",
      x: 3,
      y: 18,
      dir: "across",
      definition: "The connective tissue envelope consisting of the tough outer Dura Mater, the middle web-like Arachnoid Mater, and the delicate inner Pia Mater.",
      context: "Infection of these layers leads to meningitis (Kernig's/Brudzinski's signs). Bleeds are classified by space: epidural (arterial, lucid interval), subdural (venous, crescent-shaped), and subarachnoid (aneurysmal, thunderclap headache)."
    },
    {
      length: 4,
      clue: "The long, slender projection of a neuron that conducts electrical impulses away from the cell body.",
      x: 13,
      y: 8,
      dir: "across",
      definition: "The cylindrical extension of a neuron that conducts action potentials from the soma to terminal buttons.",
      context: "Vulnerable to shear forces in head trauma, causing Diffuse Axonal Injury (DAI) visible as microhemorrhages on MRI. Also damaged in metabolic conditions like diabetic neuropathy."
    },
    {
      length: 5,
      clue: "A prominent ridge or bump on the folded surface of the cerebral cortex.",
      x: 20,
      y: 19,
      dir: "down",
      definition: "A convolution or ridge on the outer surface of the brain, bounded by sulci.",
      context: "Primary motor commands originate in the precentral gyrus (Brodmann area 4). Somatosensory inputs are mapped to the postcentral gyrus (Brodmann areas 3, 1, 2)."
    },
    {
      length: 4,
      clue: "The primary inhibitory neurotransmitter in the mature mammalian brain.",
      x: 14,
      y: 3,
      dir: "down",
      definition: "Gamma-Aminobutyric Acid, synthesized from glutamate, which acts on hyperpolarizing GABA-A (ionotropic chloride channel) and GABA-B (metabotropic) receptors.",
      context: "Targeted by sedatives, anesthetics, and anticonvulsants (benzodiazepines, barbiturates, propofol) to enhance inhibitory tone and suppress seizures or anxiety."
    },
    {
      length: 8,
      clue: "The centrally located sensory relay station that routes sensory inputs (except olfaction) to the cortex.",
      x: 12,
      y: 4,
      dir: "across",
      definition: "A bilateral diencephalic mass of nuclei acting as the gateway for sensory information to reach the cerebral cortex, and facilitating motor and limbic loops.",
      context: "Vascular stroke in the thalamus can result in Dejerine-Roussy (Thalamic Pain) Syndrome, characterized by severe hemianesthesia followed by hyperalgesia and burning pain."
    },
    {
      length: 8,
      clue: "A key neurotransmitter involved in reward, motivation, motor control, and Parkinson's disease.",
      x: 0,
      y: 5,
      dir: "down",
      definition: "A catecholamine neurotransmitter produced in the ventral tegmental area (VTA) and substantia nigra, acting on D1-D5 receptors.",
      context: "Underlies the reward pathway in addiction. Hyperactivity of dopamine in the mesolimbic pathway is associated with positive symptoms of schizophrenia, which are treated with dopamine antagonists."
    },
    {
      length: 7,
      clue: "The microscopic junction across which a neuron sends chemical signals to another cell.",
      x: 20,
      y: 23,
      dir: "across",
      definition: "The specialized gap of about 20-40nm separating a presynaptic terminal from a postsynaptic membrane, mediating chemical or electrical communication.",
      context: "A target of multiple channelopathies and toxins (e.g., botulinum toxin cleaving SNARE proteins, tetanus toxin blocking inhibitory glycine release in the spinal cord)."
    },
    {
      length: 6,
      clue: "An acute cerebrovascular accident causing brain cell death due to lack of blood flow.",
      x: 5,
      y: 6,
      dir: "down",
      definition: "A rapid-onset focal loss of neurological function caused by ischemia (vascular occlusion, 85%) or hemorrhage (vessel rupture, 15%).",
      context: "Requires rapid intervention (clot-busting tPA or mechanical thrombectomy within specific time windows). Classic presentation includes hemiparesis, facial droop, and acute speech disturbances (FAST)."
    },
    {
      length: 6,
      clue: "The lipid-rich sheath surrounding axons that accelerates action potential propagation.",
      x: 18,
      y: 8,
      dir: "down",
      definition: "An insulating lipid-and-protein wrap created by oligodendrocytes in the CNS and Schwann cells in the PNS, enabling saltatory conduction via nodes of Ranvier.",
      context: "The target of autoimmune demyelination in Multiple Sclerosis (CNS) and Guillain-Barré Syndrome (PNS), leading to conduction block, motor weakness, and sensory deficits."
    },
    {
      length: 6,
      clue: "A groove or furrow on the brain surface separating adjacent gyri.",
      x: 18,
      y: 0,
      dir: "down",
      definition: "A cleft or depression on the cerebral cortex. Deeper furrows are called fissures.",
      context: "The Central Sulcus (of Rolando) is a crucial anatomical landmark separating the frontal and parietal lobes. The Lateral Sulcus (Sylvian Fissure) separates the temporal lobe."
    },
    {
      length: 7,
      clue: "The brainstem region controlling vital autonomic functions like heart rate and respiration.",
      x: 4,
      y: 20,
      dir: "down",
      definition: "Medulla Oblongata, the lowest part of the brainstem, housing cranial nerve nuclei IX, X, XI, XII and cardiac/respiratory regulatory centers.",
      context: "Infarctions in the lateral medulla (e.g., from PICA stroke) lead to Wallenberg Syndrome, causing dysphagia, hoarseness, ipsilateral Horner's syndrome, and contralateral loss of pain/temperature sensing."
    },
    {
      length: 6,
      clue: "An involuntary, rapid response to a stimulus, mediated by a simple neural pathway.",
      x: 14,
      y: 24,
      dir: "down",
      definition: "A stereotyped motor response mediated by a reflex arc bypass, typically consisting of sensory receptor, afferent limb, spinal integration, efferent limb, and effector.",
      context: "Exaggerated reflexes (hyperreflexia, clonus, positive Babinski sign) indicate Upper Motor Neuron (UMN) lesions. Suppressed reflexes (hyporeflexia, flaccidity) indicate Lower Motor Neuron (LMN) lesions."
    }
  ]
};

// --- Game State Variables ---
let boardWidth = crosswordData.width;
let boardHeight = crosswordData.height;
let words = crosswordData.words;

let grid = []; // 2D array of grid cells
let cellToWordMap = {}; // Maps key `x,y` to array of words passing through it
let activeCell = { x: 0, y: 0 };
let activeDirection = 'across'; // 'across' or 'down'
let hintsLeft = 3;
let timerSeconds = 0;
const CROSSWORD_TIME_LIMIT_SECONDS = 15 * 60; // 15 minutes
let timerInterval = null;
let isPaused = false;
let soundEnabled = true;
let isSolved = false;
const CROSSWORD_API_URL = 'http://localhost:3000/api/crossword';

// Audio Context for synthesized retro chimes
let audioCtx = null;

// --- Initialize App ---
document.addEventListener("DOMContentLoaded", () => {
  setupGridMap();
  assignCellNumbers();
  buildHTMLGrid();
  renderClueLists();
  
  // Select first letter cell as starting position
  selectFirstCell();

  // Setup Event Listeners
  setupEventListeners();

  // Start Timer
  document.getElementById("timerText").textContent = formatTime(CROSSWORD_TIME_LIMIT_SECONDS);
  startTimer();

  // Scale the grid to always fit fully on screen (no scrolling, no cut-off cells)
  requestAnimationFrame(fitCrosswordGrid);
  window.addEventListener("resize", () => {
    clearTimeout(window.__fitGridTimeout);
    window.__fitGridTimeout = setTimeout(fitCrosswordGrid, 100);
  });
});

// Dynamically sizes --cell-size so the grid always fits the available width exactly
// (no horizontal scrolling, no cells running off the side). Height is intentionally NOT
// constrained here - if the resulting grid is taller than the visible area, the grid card
// scrolls vertically (see .grid-scroll-container's overflow: auto), keeping cells nice and large.
function fitCrosswordGrid() {
  const gridCard = document.querySelector(".grid-card");
  if (!gridCard) return;

  const cardStyles = getComputedStyle(gridCard);
  const paddingX = parseFloat(cardStyles.paddingLeft) + parseFloat(cardStyles.paddingRight);

  const availWidth = gridCard.clientWidth - paddingX;
  if (availWidth <= 0) return;

  let cellSize = Math.floor(availWidth / boardWidth);

  // Keep cells legible and not comically oversized on very wide screens
  cellSize = Math.max(20, Math.min(cellSize, 42));

  document.documentElement.style.setProperty("--cell-size", `${cellSize}px`);
}

// Map coordinates to word associations
function setupGridMap() {
  for (let y = 0; y < boardHeight; y++) {
    grid[y] = [];
    for (let x = 0; x < boardWidth; x++) {
      grid[y][x] = {
        letter: null,        // Correct letter
        userLetter: "",      // User input letter
        number: null,        // Start number
        isBlack: true,       // Block cell or playable
        words: [],           // Associated words
        hinted: false,       // Hinted state
        x,
        y
      };
    }
  }

  // Populate cells with word details
  words.forEach((w) => {
    for (let i = 0; i < w.length; i++) {
      const curX = w.dir === 'across' ? w.x + i : w.x;
      const curY = w.dir === 'down' ? w.y + i : w.y;
      
      const cell = grid[curY][curX];
      cell.isBlack = false;
      cell.words.push(w);
      
      const key = `${curX},${curY}`;
      if (!cellToWordMap[key]) cellToWordMap[key] = [];
      cellToWordMap[key].push(w);
    }
  });
}

// Assign standard crossword start numbers based on scanning top-to-bottom, left-to-right
function assignCellNumbers() {
  let currentNum = 1;
  
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      const cell = grid[y][x];
      if (cell.isBlack) continue;

      let isStartOfAcross = false;
      let isStartOfDown = false;

      // Check if this is the start of an Across word
      const acrossWord = cell.words.find(w => w.dir === 'across' && w.x === x && w.y === y);
      if (acrossWord) isStartOfAcross = true;

      // Check if this is the start of a Down word
      const downWord = cell.words.find(w => w.dir === 'down' && w.x === x && w.y === y);
      if (downWord) isStartOfDown = true;

      if (isStartOfAcross || isStartOfDown) {
        cell.number = currentNum;
        
        if (isStartOfAcross) acrossWord.number = currentNum;
        if (isStartOfDown) downWord.number = currentNum;
        
        currentNum++;
      }
    }
  }
}

// Build the HTML grid element
function buildHTMLGrid() {
  const gridEl = document.getElementById("crosswordGrid");
  gridEl.style.gridTemplateColumns = `repeat(${boardWidth}, var(--cell-size))`;
  gridEl.style.gridTemplateRows = `repeat(${boardHeight}, var(--cell-size))`;
  gridEl.innerHTML = "";

  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      const cell = grid[y][x];
      const cellDiv = document.createElement("div");
      cellDiv.id = `cell-${x}-${y}`;
      cellDiv.className = "grid-cell";
      
      if (cell.isBlack) {
        cellDiv.className += " cell-empty";
      } else {
        // Number tag
        if (cell.number) {
          const numSpan = document.createElement("span");
          numSpan.className = "grid-cell-number";
          numSpan.textContent = cell.number;
          cellDiv.appendChild(numSpan);
        }

        // Input element
        const input = document.createElement("input");
        input.className = "grid-cell-input";
        input.setAttribute("maxlength", "1");
        input.setAttribute("type", "text");
        input.setAttribute("tabindex", "-1");
        input.value = cell.userLetter;
        
        // Prevent default cursor focus styling and standard selection
        input.addEventListener("mousedown", (e) => {
          e.preventDefault();
          onCellClick(x, y);
        });

        cellDiv.appendChild(input);
        cell.element = cellDiv;
        cell.inputElement = input;
      }

      gridEl.appendChild(cellDiv);
    }
  }
}

// Populate the side clue lists
function renderClueLists() {
  const acrossList = document.getElementById("acrossClueList");
  const downList = document.getElementById("downClueList");
  acrossList.innerHTML = "";
  downList.innerHTML = "";

  // Sort words by starting number
  const acrossWords = words.filter(w => w.dir === 'across').sort((a, b) => a.number - b.number);
  const downWords = words.filter(w => w.dir === 'down').sort((a, b) => a.number - b.number);

  acrossWords.forEach(w => {
    const li = document.createElement("li");
    li.className = "clue-list-item";
    li.id = `clue-across-${w.number}`;
    li.innerHTML = `<span class="clue-item-number">${w.number}</span><span class="clue-item-text">${w.clue}</span>`;
    li.addEventListener("click", () => onClueClick(w));
    acrossList.appendChild(li);
  });

  downWords.forEach(w => {
    const li = document.createElement("li");
    li.className = "clue-list-item";
    li.id = `clue-down-${w.number}`;
    li.innerHTML = `<span class="clue-item-number">${w.number}</span><span class="clue-item-text">${w.clue}</span>`;
    li.addEventListener("click", () => onClueClick(w));
    downList.appendChild(li);
  });
}

// Highlight word cells and clue selection based on active state
function highlightActiveElements() {
  // Clear previous highlights
  document.querySelectorAll(".grid-cell").forEach(el => {
    el.classList.remove("cell-active", "cell-highlight");
  });
  document.querySelectorAll(".clue-list-item").forEach(el => {
    el.classList.remove("clue-highlight");
  });

  if (isPaused || isSolved) return;

  const currentCell = grid[activeCell.y][activeCell.x];
  if (currentCell.isBlack) return;

  // Find the word in the active direction that passes through this cell
  const activeWord = currentCell.words.find(w => w.dir === activeDirection) || currentCell.words[0];
  
  if (!activeWord) return;
  
  // Highlight active word cells
  for (let i = 0; i < activeWord.length; i++) {
    const wX = activeWord.dir === 'across' ? activeWord.x + i : activeWord.x;
    const wY = activeWord.dir === 'down' ? activeWord.y + i : activeWord.y;
    
    const cellObj = grid[wY][wX];
    if (cellObj && cellObj.element) {
      if (wX === activeCell.x && wY === activeCell.y) {
        cellObj.element.classList.add("cell-active");
      } else {
        cellObj.element.classList.add("cell-highlight");
      }
    }
  }

  // Highlight current active clue
  const clueId = `clue-${activeWord.dir}-${activeWord.number}`;
  const clueEl = document.getElementById(clueId);
  if (clueEl) {
    clueEl.classList.add("clue-highlight");
    // Scroll active clue into view smoothly
    clueEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Update top subheader bar active clue text
  const labelEl = document.getElementById("activeClueLabel");
  const textEl = document.getElementById("activeClueText");
  labelEl.textContent = `${activeWord.number} ${activeWord.dir.toUpperCase()}`;
  textEl.textContent = activeWord.clue;
}

// Select first cell in the grid
function selectFirstCell() {
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      if (!grid[y][x].isBlack) {
        activeCell = { x, y };
        const cell = grid[y][x];
        activeDirection = cell.words[0].dir;
        highlightActiveElements();
        return;
      }
    }
  }
}

// Handle cell clicks
function onCellClick(x, y) {
  if (isPaused || isSolved) return;
  
  if (activeCell.x === x && activeCell.y === y) {
    // Toggle direction if clicked on already selected cell
    const cell = grid[y][x];
    if (cell.words.length > 1) {
      activeDirection = activeDirection === 'across' ? 'down' : 'across';
    }
  } else {
    activeCell = { x, y };
    const cell = grid[y][x];
    // If current cell doesn't have a word in the current direction, switch direction
    const hasDirectionWord = cell.words.some(w => w.dir === activeDirection);
    if (!hasDirectionWord) {
      activeDirection = cell.words[0].dir;
    }
  }
  highlightActiveElements();
  playSound('click');
}

// Handle clue list clicks
function onClueClick(word) {
  if (isPaused || isSolved) return;
  
  activeCell = { x: word.x, y: word.y };
  activeDirection = word.dir;
  highlightActiveElements();
  playSound('click');
}

// Setup keyboard and application event listeners
function setupEventListeners() {
  // Capture general keyboard inputs when focus is in the body
  document.addEventListener("keydown", (e) => {
    if (isPaused || isSolved) return;

    // Check if input or dialog is open that shouldn't receive inputs
    if (document.activeElement.tagName === 'INPUT' && !document.activeElement.classList.contains('grid-cell-input')) {
      return;
    }

    const key = e.key;
    const cell = grid[activeCell.y][activeCell.x];

    if (key.length === 1 && key.match(/[a-zA-Z]/)) {
      e.preventDefault();
      // Set letter
      cell.userLetter = key.toUpperCase();
      cell.inputElement.value = cell.userLetter;
      cell.element.classList.remove("cell-incorrect");
      
      // Move to next cell
      moveCursor(1);
      checkBoardStatus();
      playSound('click');
    } else if (key === "Backspace") {
      e.preventDefault();
      if (cell.userLetter !== "") {
        cell.userLetter = "";
        cell.inputElement.value = "";
        cell.element.classList.remove("cell-incorrect");
      } else {
        // Move back and clear
        moveCursor(-1);
        const prevCell = grid[activeCell.y][activeCell.x];
        prevCell.userLetter = "";
        prevCell.inputElement.value = "";
        prevCell.element.classList.remove("cell-incorrect");
      }
      highlightActiveElements();
      playSound('click');
    } else if (key === "Delete") {
      e.preventDefault();
      cell.userLetter = "";
      cell.inputElement.value = "";
      cell.element.classList.remove("cell-incorrect");
      highlightActiveElements();
    } else if (key === "Space" || key === " ") {
      e.preventDefault();
      if (cell.words.length > 1) {
        activeDirection = activeDirection === 'across' ? 'down' : 'across';
        highlightActiveElements();
      }
      playSound('click');
    } else if (key === "ArrowUp") {
      e.preventDefault();
      moveVertical(-1);
    } else if (key === "ArrowDown") {
      e.preventDefault();
      moveVertical(1);
    } else if (key === "ArrowLeft") {
      e.preventDefault();
      moveHorizontal(-1);
    } else if (key === "ArrowRight") {
      e.preventDefault();
      moveHorizontal(1);
    } else if (key === "Tab") {
      e.preventDefault();
      // Move to next word
      moveWord(e.shiftKey ? -1 : 1);
    } else if (key === "Enter") {
      e.preventDefault();
      moveWord(1);
    }
  });

  // Timer Click (Pause/Resume)
  document.getElementById("timerContainer").addEventListener("click", togglePause);
  document.getElementById("pauseOverlay").addEventListener("click", togglePause);
  document.getElementById("resumeBtn").addEventListener("click", togglePause);
  
  // Volume Toggle
  const soundBtn = document.getElementById("soundBtn");
  soundBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      soundBtn.classList.add("active");
      document.querySelector(".icon-sound-on").classList.remove("hidden");
      document.querySelector(".icon-sound-off").classList.add("hidden");
      // Initialise Audio Context
      initAudio();
      playSound('click');
    } else {
      soundBtn.classList.remove("active");
      document.querySelector(".icon-sound-on").classList.add("hidden");
      document.querySelector(".icon-sound-off").classList.remove("hidden");
    }
  });



  // Hint Logic
  const hintBtn = document.getElementById("hintBtn");
  const hintMenu = document.getElementById("hintMenu");
  hintBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (hintsLeft > 0 && !isSolved && !isPaused) {
      hintMenu.classList.toggle("hidden");
    }
  });

  document.addEventListener("click", () => {
    hintMenu.classList.add("hidden");
  });

  document.getElementById("hintRevealCell").addEventListener("click", revealActiveCell);
  document.getElementById("hintRevealWord").addEventListener("click", revealActiveWord);
  document.getElementById("hintCheckCell").addEventListener("click", checkActiveCell);

  document.getElementById("playAgainBtn").addEventListener("click", () => {
    document.getElementById("victoryOverlay").classList.add("hidden");
    resetGame();
  });

  // Popover close
  document.getElementById("closePopoverBtn").addEventListener("click", () => {
    document.getElementById("infoPopover").classList.add("hidden");
  });
}

// Move cursor forwards or backwards along the active word
function moveCursor(dir) {
  const currentCell = grid[activeCell.y][activeCell.x];
  const activeWord = currentCell.words.find(w => w.dir === activeDirection) || currentCell.words[0];
  if (!activeWord) return;

  const wordIndex = activeDirection === 'across' ? activeCell.x - activeWord.x : activeCell.y - activeWord.y;
  const nextIndex = wordIndex + dir;

  if (nextIndex >= 0 && nextIndex < activeWord.length) {
    activeCell.x = activeDirection === 'across' ? activeWord.x + nextIndex : activeWord.x;
    activeCell.y = activeDirection === 'across' ? activeWord.y : activeWord.y + nextIndex;
  } else {
    // Jump to the next empty cell or first cell of the next word
    // Keep selection where it is if we hit boundaries
  }
  highlightActiveElements();
}

// Navigate Grid cell by cell horizontally (arrow left/right)
function moveHorizontal(dir) {
  let nextX = activeCell.x + dir;
  while (nextX >= 0 && nextX < boardWidth) {
    const nextCell = grid[activeCell.y][nextX];
    if (!nextCell.isBlack) {
      activeCell.x = nextX;
      // If cell has word in current direction, keep direction. Otherwise toggle
      const hasWord = nextCell.words.some(w => w.dir === activeDirection);
      if (!hasWord) {
        activeDirection = nextCell.words[0].dir;
      }
      highlightActiveElements();
      return;
    }
    nextX += dir;
  }
}

// Navigate Grid cell by cell vertically (arrow up/down)
function moveVertical(dir) {
  let nextY = activeCell.y + dir;
  while (nextY >= 0 && nextY < boardHeight) {
    const nextCell = grid[nextY][activeCell.x];
    if (!nextCell.isBlack) {
      activeCell.y = nextY;
      const hasWord = nextCell.words.some(w => w.dir === activeDirection);
      if (!hasWord) {
        activeDirection = nextCell.words[0].dir;
      }
      highlightActiveElements();
      return;
    }
    nextY += dir;
  }
}

// Navigate between words (tab / shift-tab / enter)
function moveWord(dir) {
  const currentCell = grid[activeCell.y][activeCell.x];
  const activeWord = currentCell.words.find(w => w.dir === activeDirection) || currentCell.words[0];
  
  // Sort words sequentially by number and direction (across first, then down)
  const sortedWords = [...words].sort((a, b) => {
    if (a.dir === b.dir) return a.number - b.number;
    return a.dir === 'across' ? -1 : 1;
  });

  const curIndex = sortedWords.findIndex(w => w.x === activeWord.x && w.y === activeWord.y && w.dir === activeWord.dir);
  let nextIndex = (curIndex + dir + sortedWords.length) % sortedWords.length;
  
  const nextWord = sortedWords[nextIndex];
  activeCell = { x: nextWord.x, y: nextWord.y };
  activeDirection = nextWord.dir;
  highlightActiveElements();
}

// --- Audio Engine (Web Audio API Synthesizer) ---
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSound(type) {
  if (!soundEnabled) return;
  initAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const now = audioCtx.currentTime;
  
  if (type === 'click') {
    // Very short, high frequency organic mechanical tick
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
    
    gain.gain.setValueAtTime(0.015, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(now);
    osc.stop(now + 0.06);
  } 
  else if (type === 'correct-word') {
    // Elegant rising major chord arpeggio
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    frequencies.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.06 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.3);
    });
  } 
  else if (type === 'error') {
    // Short quiet warning flat buzzer
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start(now);
    osc.stop(now + 0.16);
  } 
  else if (type === 'victory') {
    // Majestic complex synthesizer chime
    const scale = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50, 1318.51, 1567.98]; // C major scale up to G6
    scale.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.7);
    });
  }
}

// --- Timer Management ---
function startTimer() {
  timerInterval = setInterval(() => {
    if (!isPaused && !isSolved) {
      timerSeconds++;
      const remaining = CROSSWORD_TIME_LIMIT_SECONDS - timerSeconds;

      if (remaining <= 0) {
        document.getElementById("timerText").textContent = "00:00";
        handleCrosswordTimeout();
        return;
      }

      document.getElementById("timerText").textContent = formatTime(remaining);
      if (remaining <= 30) {
        document.getElementById("timerContainer").classList.add("timer-warning");
      }
    }
  }, 1000);
}

function countSolvedWords() {
  return words.filter(w => {
    for (let i = 0; i < w.length; i++) {
      const wX = w.dir === 'across' ? w.x + i : w.x;
      const wY = w.dir === 'across' ? w.y : w.y + i;
      if (!grid[wY][wX].userLetter) return false;
    }
    return true;
  }).length;
}

// Called when the 15-minute countdown hits zero before the puzzle is solved
function handleCrosswordTimeout() {
  if (isSolved) return; // already solved right before the tick, ignore
  isSolved = true; // reuses the existing "solved" gate to block further input
  clearInterval(timerInterval);

  const hintsUsed = 3 - hintsLeft;
  const wordsSolved = countSolvedWords();

  document.getElementById("timeoutWordsSolved").textContent = `${wordsSolved} / ${words.length}`;
  document.getElementById("timeoutHintsUsed").textContent = hintsUsed;
  document.getElementById("timeoutOverlay").classList.remove("hidden");

  const finishBtn = document.getElementById("timeoutFinishBtn");
  if (finishBtn) {
    finishBtn.onclick = () => {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'crossword-finished',
          completed: false,
          timeSeconds: CROSSWORD_TIME_LIMIT_SECONDS,
          hintsUsed: hintsUsed,
          wordsSolved: wordsSolved,
          totalWords: words.length,
          rank: 'Incomplete'
        }, '*');
      }
    };
  }
}

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, "0");
  const s = (secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function togglePause() {
  if (isSolved) return;
  
  isPaused = !isPaused;
  const overlay = document.getElementById("pauseOverlay");
  const pauseIcon = document.getElementById("pauseIcon");
  const playIcon = document.getElementById("playIcon");
  const boardEl = document.querySelector(".grid-card");

  if (isPaused) {
    overlay.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
    playIcon.classList.remove("hidden");
    boardEl.style.filter = "blur(12px)";
    playSound('click');
  } else {
    overlay.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
    playIcon.classList.add("hidden");
    boardEl.style.filter = "none";
    playSound('click');
  }
  highlightActiveElements();
}

// --- Hints Management ---
function updateHintUI() {
  document.getElementById("hintCount").textContent = hintsLeft;
  if (hintsLeft <= 0) {
    const hintBtn = document.getElementById("hintBtn");
    hintBtn.classList.add("btn-outline");
    hintBtn.classList.remove("btn-secondary");
    hintBtn.disabled = true;
    hintBtn.style.opacity = "0.5";
  }
}

function useHint() {
  if (hintsLeft <= 0) return false;
  hintsLeft--;
  updateHintUI();
  return true;
}

// Reveal current cell
function revealActiveCell() {
  if (hintsLeft <= 0 || isSolved || isPaused) return;
  
  const cell = grid[activeCell.y][activeCell.x];
  if (cell.isBlack) return;

  alert("Hints cannot reveal answers. Use the check function to validate your entries.");
}

// Reveal active word
function revealActiveWord() {
  if (hintsLeft <= 0 || isSolved || isPaused) return;

  const cell = grid[activeCell.y][activeCell.x];
  if (cell.isBlack) return;

  const activeWord = cell.words.find(w => w.dir === activeDirection) || cell.words[0];
  if (!activeWord) return;

  // Verify if it needs reveal (at least one letter incorrect or missing)
  alert("Hints cannot reveal answers. Use the check function to validate your entries.");
}

// Validate if active cell's current input is correct
async function checkActiveCell() {
  if (hintsLeft <= 0 || isSolved || isPaused) return;

  const cell = grid[activeCell.y][activeCell.x];
  if (cell.isBlack || cell.userLetter === "") return;

  if (useHint()) {
    const activeWord = cell.words.find(w => w.dir === activeDirection) || cell.words[0];
    const wordIndex = words.indexOf(activeWord);
    const correct = await verifyWord(activeWord, wordIndex);
    const clueEl = document.getElementById(`clue-${activeWord.dir}-${activeWord.number}`);
    if (clueEl) clueEl.classList.toggle('clue-solved', correct);

    if (correct) {
      playSound('correct-word');
    } else {
      cell.element.classList.add('cell-incorrect');
      playSound('error');
    }
  }
}

// --- Check Board status and verify solution ---
async function verifyWord(word, wordIndex) {
  let submittedWord = '';
  for (let i = 0; i < word.length; i++) {
    const x = word.dir === 'across' ? word.x + i : word.x;
    const y = word.dir === 'across' ? word.y : word.y + i;
    submittedWord += grid[y][x].userLetter;
  }

  try {
    const response = await fetch(`${CROSSWORD_API_URL}/verify-word/${wordIndex}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: submittedWord })
    });
    if (!response.ok) return false;
    const result = await response.json();
    return result.correct === true;
  } catch (error) {
    console.error('Unable to verify crossword word:', error);
    return false;
  }
}

async function checkBoardStatus() {
  const wordResults = await Promise.all(words.map((word, index) => verifyWord(word, index)));

  words.forEach((w, index) => {
    const clueEl = document.getElementById(`clue-${w.dir}-${w.number}`);
    if (clueEl) clueEl.classList.toggle('clue-solved', wordResults[index]);
  });

  if (wordResults.every(Boolean)) {
    triggerVictory();
  }
}

// Play completion chime, calculate rating, show final modal
function triggerVictory() {
  isSolved = true;
  clearInterval(timerInterval);
  playSound('victory');
  
  // Calculate Medical rank
  const hintsUsed = 3 - hintsLeft;
  let rank = "Medical Student";

  if (timerSeconds < 180 && hintsUsed === 0) {
    rank = "Chief of Neurosurgery 👑";
  } else if (timerSeconds < 360 && hintsUsed <= 1) {
    rank = "Attending Neurologist 🧠";
  } else if (timerSeconds < 540 && hintsUsed <= 2) {
    rank = "Neuroscience Fellow 🔬";
  } else if (timerSeconds < 900) {
    rank = "Neurology Resident 🩺";
  }

  // Display stats
  document.getElementById("victoryTime").textContent = formatTime(timerSeconds);
  document.getElementById("victoryHints").textContent = hintsUsed;
  document.getElementById("victoryRank").textContent = rank;

  // BuildSolved word chips for explanations
  const chipsContainer = document.getElementById("victoryWordChips");
  chipsContainer.innerHTML = "";
  
  // Sort alphabetically
  const sortedSolved = [...words].sort((a, b) => a.number - b.number || a.dir.localeCompare(b.dir));
  sortedSolved.forEach(w => {
    const chip = document.createElement("button");
    chip.className = "word-chip";
    chip.textContent = `SOLVED ENTRY ${w.number}`;
    chip.addEventListener("click", () => {
      showClinicalPopover(w);
    });
    chipsContainer.appendChild(chip);
  });

  // Display overlay
  document.getElementById("victoryOverlay").classList.remove("hidden");
  
  // Trigger Confetti
  startConfetti();

  // Wire up the "Finish & View Final Score" button (sends results to parent app, if embedded)
  const finishBtn = document.getElementById("finishAndReturnBtn");
  if (finishBtn) {
    finishBtn.onclick = () => {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'crossword-finished',
          completed: true,
          timeSeconds: timerSeconds,
          hintsUsed: hintsUsed,
          wordsSolved: words.length,
          totalWords: words.length,
          rank: rank
        }, '*');
      }
    };
  }
}

// Show medical info popover for clicked solved words
function showClinicalPopover(w) {
  document.getElementById("popoverWord").textContent = `SOLVED ENTRY ${w.number}`;
  document.getElementById("popoverDefinition").textContent = w.definition;
  document.getElementById("popoverContext").textContent = w.context;
  
  const popover = document.getElementById("infoPopover");
  popover.classList.remove("hidden");
}

// --- Confetti particle engine ---
let confettiActive = false;
let confettiParticles = [];
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");

function startConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiActive = true;
  confettiParticles = [];
  
  const themeColors = ['#a020f0', '#ff007f', '#00f0ff', '#39ff14'];
  for (let i = 0; i < 150; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * confettiCanvas.height,
      color: themeColors[Math.floor(Math.random() * themeColors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngleIncremental: Math.random() * 0.07 + 0.02,
      tiltAngle: 0
    });
  }
  
  requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
  if (!confettiActive) return;
  
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  let finished = true;
  confettiParticles.forEach((p, idx) => {
    p.tiltAngle += p.tiltAngleIncremental;
    p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
    p.x += Math.sin(p.tiltAngle);
    p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;
    
    if (p.y < confettiCanvas.height) {
      finished = false;
    }
    
    ctx.beginPath();
    ctx.lineWidth = p.r;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
    ctx.stroke();
  });
  
  if (finished) {
    confettiActive = false;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  } else {
    requestAnimationFrame(updateConfetti);
  }
}

// Window resizing for Confetti Canvas
window.addEventListener("resize", () => {
  if (confettiActive) {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
});

// --- Game Reset ---
function resetGame() {
  clearInterval(timerInterval);
  timerSeconds = 0;
  isPaused = false;
  isSolved = false;
  hintsLeft = 3;
  
  document.getElementById("timerText").textContent = formatTime(CROSSWORD_TIME_LIMIT_SECONDS);
  document.getElementById("timerContainer").classList.remove("timer-warning");
  document.getElementById("victoryOverlay").classList.add("hidden");
  document.getElementById("timeoutOverlay").classList.add("hidden");
  document.getElementById("infoPopover").classList.add("hidden");
  document.querySelector(".grid-card").style.filter = "none";
  document.getElementById("pauseIcon").classList.remove("hidden");
  document.getElementById("playIcon").classList.add("hidden");

  // Reset hint UI
  const hintBtn = document.getElementById("hintBtn");
  hintBtn.classList.remove("btn-outline");
  hintBtn.classList.add("btn-secondary");
  hintBtn.disabled = false;
  hintBtn.style.opacity = "1";
  updateHintUI();

  // Reset board data
  for (let y = 0; y < boardHeight; y++) {
    for (let x = 0; x < boardWidth; x++) {
      const cell = grid[y][x];
      if (cell.isBlack) continue;
      
      cell.userLetter = "";
      if (cell.inputElement) {
        cell.inputElement.value = "";
      }
      if (cell.element) {
        cell.element.className = "grid-cell";
      }
    }
  }

  renderClueLists();
  selectFirstCell();
  startTimer();
  requestAnimationFrame(fitCrosswordGrid);
}

// Add a diagnostic cheat code for review / testing (Ctrl + Shift + V solves 95% of grid)
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === "V") {
    e.preventDefault();
    if (confirm("Execute Clinical Autofill cheat code? (Fills all cells correctly)")) {
      for (let y = 0; y < boardHeight; y++) {
        for (let x = 0; x < boardWidth; x++) {
          const cell = grid[y][x];
          if (cell.isBlack) continue;
          cell.userLetter = "";
          cell.inputElement.value = "";
          cell.element.classList.remove("cell-incorrect");
        }
      }
      checkBoardStatus();
    }
  }
});
