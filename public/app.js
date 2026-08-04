// Neuroscience Olympiad Escape Room - Core Game Logic

// Game State
const TOTAL_TIME_MS = 45 * 60 * 1000; // 45 minutes
const state = {
  teamName: '',
  startTime: null,
  timeRemaining: TOTAL_TIME_MS,
  timerInterval: null,
  gameCompleted: false,
  pinCode: '',
  currentRoom: 1,
  activePatient: null,
  examinedPatients: {
    a: false,
    b: false,
    c: false,
    d: false
  },
  // Patient CN V checklist (Room 1)
  cn5CheckedNodes: {
    'l-v1': false, 'l-v2': false, 'l-v3': false,
    'r-v1': false, 'r-v2': false, 'r-v3': false
  },
  activeTools: {
    a: 'flashlight',
    b: 'smile',
    c: 'cotton',
    d: 'target'
  },
  wrongPinAttempts: 0,
  roomsSucceeded: 0,
  roomsFailed: 0,
  roomAttemptLog: [], // { room, solved, attemptsUsed } - populated as each room ends, used for attempt-tiered scoring
  crosswordStats: null // { timeSeconds, hintsUsed, rank } - populated when crossword finishes
};

// Rooms Registry
const roomsData = [
  {
    number: 1,
    name: 'Cranial Nerve Defects',
    instructions: 'Enter the 4-digit diagnostic PIN to release the electromagnetic locks. The code is formed by the cranial nerve numbers corresponding to each patient\'s defect, ordered from <strong>Patient A to Patient D</strong>.',
    patients: {
      a: {
        id: 'PATIENT A',
        name: 'Arthur Pendelton',
        ageSex: '54 / Male',
        vitals: 'Stable (HR 72, BP 138/88)',
        history: 'Arthur woke up with a droopy right eye and double vision. When questioned, he denies any neck pain or trauma, but reports a mild headache behind his right eye. He is highly anxious about his vision.',
        summary: 'A 54-year-old male who woke up with a heavy droop in his right eyelid and claims his vision is doubled.',
        tools: [
          { id: 'flashlight', label: 'FLASHLIGHT' },
          { id: 'lift', label: 'ELEVATE EYELID' }
        ],
        defaultDialogue: 'Arthur: "I can\'t open my right eye... and when you hold it open, everything is double!"'
      },
      b: {
        id: 'PATIENT B',
        name: 'Beatrix Miller',
        ageSex: '29 / Female',
        vitals: 'Stable (HR 68, BP 118/75)',
        history: 'Beatrix woke up this morning unable to close her right eye, and noticed that water poured right out of the right side of her lips when brushing her teeth. She reports a strange, metallic taste in the front of her tongue.',
        summary: 'A 29-year-old female complaining that water spills out of the right side of her mouth when drinking and she can\'t close her right eye.',
        tools: [
          { id: 'smile', label: 'ASK TO SMILE' },
          { id: 'eyebrows', label: 'ASK TO RAISE BROW' },
          { id: 'blink', label: 'ASK TO BLINK' }
        ],
        defaultDialogue: 'Beatrix: "My face feels so heavy on the right side. I feel like everyone is staring at me."'
      },
      c: {
        id: 'PATIENT C',
        name: 'Charles Dupont',
        ageSex: '42 / Male',
        vitals: 'Stable (HR 80, BP 122/80)',
        history: 'Charles presents with sudden numbness on the right side of his face. He noticed it while shaving, saying he couldn\'t feel the razor on his cheek or jaw. He also reports minor difficulty chewing his breakfast.',
        summary: 'A 42-year-old male who reports that his face feels completely numb on the right side while shaving, and chewing feels awkward.',
        tools: [
          { id: 'cotton', label: 'COTTON WISP' },
          { id: 'jaw', label: 'TEST JAW CLENCH' }
        ],
        defaultDialogue: 'Charles: "It feels like dental anesthesia on the entire right side of my face, but it won\'t wear off!"'
      },
      d: {
        id: 'PATIENT D',
        name: 'Diana Prince',
        ageSex: '37 / Female',
        vitals: 'Stable (HR 64, BP 110/70)',
        history: 'Diana reports binocular double vision that worsens when she looks to the right. On initial inspection, you notice her right eye rests slightly closer to her nose than the left eye.',
        summary: 'A 37-year-old female presenting with double vision. You notice her right eye looks slightly deviated inwards toward her nose.',
        tools: [
          { id: 'target', label: 'TRACKING DOT' }
        ],
        defaultDialogue: 'Diana: "When I look straight ahead or left, things aren\'t too bad. But if I try to look to the right, everything splits in two."'
      }
    }
  },
  {
    number: 2,
    name: 'Cerebrum — Stroke Unit',
    instructions: 'Enter the 4-digit diagnostic PIN to release the locks. The code is formed by localizing each patient to a brain region (A to D) using the key: <strong>Left Frontal=1, Right Frontal=2, Left Parietal=3, Right Parietal=4, Left Temporal=5, Right Temporal=6, Left Occipital=7, Right Occipital=8</strong>.',
    patients: {
      a: {
        id: 'PATIENT A',
        name: 'Robert Hale',
        ageSex: '58 / Male',
        vitals: 'Stable (HR 76, BP 130/82)',
        history: 'Two days after a minor head injury on the right side, Robert\'s family says he has become uncharacteristically impulsive, cracking inappropriate jokes at his mother\'s funeral, and unable to follow through on simple household plans. Strength, speech, and memory all test normal.',
        summary: 'A 58-year-old male who has become highly impulsive and disorganized after a head injury.',
        tools: [
          { id: 'observe_behavior', label: 'OBSERVE BEHAVIOR' }
        ],
        defaultDialogue: 'Robert: "I don\'t see what the big deal is! A joke is a joke, right? Let\'s go do something fun!"'
      },
      b: {
        id: 'PATIENT B',
        name: 'Elena Vasquez',
        ageSex: '71 / Female',
        vitals: 'Stable (HR 82, BP 142/90)',
        history: 'Elena speaks in long, fluent sentences that do not make sense, substituting incorrect words and inventing entire words. She seems completely unaware that anything is wrong and is unable to follow simple two-step commands.',
        summary: 'A 71-year-old female with fluent but nonsensical speech and poor comprehension.',
        tools: [
          { id: 'query_speech', label: 'ASK PATIENT A QUESTION' }
        ],
        defaultDialogue: 'Elena: "The flibberish on the wall went to the blue sky of run, you know? It\'s so clear!"'
      },
      c: {
        id: 'PATIENT C',
        name: 'Marcus Webb',
        ageSex: '45 / Male',
        vitals: 'Stable (HR 70, BP 120/78)',
        history: 'Marcus woke up unable to see anything to his right with either eye. His eye movements test fully normal and there is no physical weakness.',
        summary: 'A 45-year-old male with sudden loss of right-sided vision in both eyes.',
        tools: [
          { id: 'visual_field', label: 'TEST VISUAL FIELDS' }
        ],
        defaultDialogue: 'Marcus: "I keep bumping into things on my right side. It\'s like half of my world just vanished."'
      },
      d: {
        id: 'PATIENT D',
        name: 'Priya Sharma',
        ageSex: '63 / Female',
        vitals: 'Stable (HR 74, BP 135/85)',
        history: 'Priya keeps leaving food on the left side of her plate and bumping into doorframes on her left. She insists nothing is wrong with her left arm, even when you hold it up directly in front of her.',
        summary: 'A 63-year-old female showing left-sided neglect and denial of deficit (anosognosia).',
        tools: [
          { id: 'neglect_plate', label: 'SERVE FOOD PLATE' }
        ],
        defaultDialogue: 'Priya: "Why are you showing me my arm? There\'s nothing wrong with my arm, and I\'m finished with my meal!"'
      }
    }
  },
  {
    number: 3,
    name: 'Diencephalon — The Relay Station',
    instructions: 'Enter the 4-digit diagnostic PIN to release the locks. Localize each patient (A to D) to a division using the key: <strong>Thalamus=1, Hypothalamus=2, Epithalamus=3, Subthalamus=4</strong>.',
    patients: {
      a: {
        id: 'PATIENT A',
        name: 'Walter Greco',
        ageSex: '67 / Male',
        vitals: 'Stable (HR 75, BP 140/85)',
        history: 'Three weeks after a stroke, Walter describes his left side as constantly "on fire". Even the light brushing of a bedsheet against his skin is excruciatingly painful. There is no rash, injury, or peripheral nerve damage.',
        summary: 'A 67-year-old male complaining of excruciating left-sided pain triggered by light touch.',
        tools: [
          { id: 'touch_brush', label: 'SENSORY BRUSH' }
        ],
        defaultDialogue: 'Walter: "Don\'t touch me! Even a light breeze on my left arm feels like boiling oil!"'
      },
      b: {
        id: 'PATIENT B',
        name: 'Natasha Ibrahim',
        ageSex: '54 / Female',
        vitals: 'Stable (HR 78, BP 128/80)',
        history: 'Natasha\'s right arm and leg suddenly began flinging about wildly and violently this morning. Her movements are large-amplitude and involuntary, making it dangerous to stand near her.',
        summary: 'A 54-year-old female with sudden-onset violent flinging movements of the right limbs.',
        tools: [
          { id: 'motor_observe', label: 'OBSERVE LIMBS' }
        ],
        defaultDialogue: 'Natasha: "I can\'t stop it! My arm just flings on its own, I have no control over it!"'
      },
      c: {
        id: 'PATIENT C',
        name: 'Daniel Cho',
        ageSex: '38 / Male',
        vitals: 'Stable (HR 85, BP 115/70)',
        history: 'Daniel presents confused, unable to walk a straight line, and with eyes that drift involuntarily on lateral gaze (nystagmus). His friend mentions months of heavy drinking and extremely poor nutrition.',
        summary: 'A 38-year-old male with ataxia, confusion, and nystagmus with a history of alcohol abuse.',
        tools: [
          { id: 'nystagmus_test', label: 'TEST LATERAL GAZE' }
        ],
        defaultDialogue: 'Daniel: "Where... where am I? Everything is spinning, and I can\'t keep my balance..."'
      },
      d: {
        id: 'PATIENT D',
        name: 'Tomas Reyes',
        ageSex: '16 / Male',
        vitals: 'Stable (HR 60, BP 105/65)',
        history: 'Tomas has been falling asleep in class for months, yet is wide awake at 3:00 AM. An MRI scan shows a small tumor pressing on a midline brain structure just behind the third ventricle.',
        summary: 'A 16-year-old male with severe sleep-wake disturbances and a posterior third-ventricle mass.',
        tools: [
          { id: 'circadian_check', label: 'CHECK HORMONES' }
        ],
        defaultDialogue: 'Tomas: "I\'m just so tired during the day, but my body refuses to sleep at night. I don\'t know why."'
      }
    }
  },
  {
    number: 4,
    name: 'Cerebellum — The DANISH Files',
    instructions: 'Enter the 4-digit diagnostic PIN. Identify the cerebellar sign for each patient (A to D) using the key: <strong>Dysdiadochokinesia=1, Ataxia=2, Nystagmus=3, Intention Tremor=4, Slurred Speech=5, Hypotonia=6</strong>.',
    patients: {
      a: {
        id: 'PATIENT A',
        name: 'Grace Okafor',
        ageSex: '29 / Female',
        vitals: 'Stable (HR 72, BP 110/72)',
        history: 'Grace\'s limbs are unusually "floppy" on exam. Tapping her patellar tendon makes her leg swing back and forth like a pendulum several times before settling, rather than a single brief twitch.',
        summary: 'A 29-year-old female with floppy limbs and a pendular patellar reflex.',
        tools: [
          { id: 'reflex_tap', label: 'REFLEX HAMMER' }
        ],
        defaultDialogue: 'Grace: "My muscles feel like jelly today. I just feel so weak and loose."'
      },
      b: {
        id: 'PATIENT B',
        name: 'Samuel Patel',
        ageSex: '50 / Male',
        vitals: 'Stable (HR 68, BP 122/80)',
        history: 'When asked to rapidly flip his palms up and down (pronation and supination), Samuel cannot find a rhythm. The movement is slow, irregular, and becomes increasingly clumsy on the right side.',
        summary: 'A 50-year-old male with difficulty performing rapid alternating movements.',
        tools: [
          { id: 'dysdiad_test', label: 'TEST ALTERNATE ARMS' }
        ],
        defaultDialogue: 'Samuel: "My left hand is fine, but my right hand just gets completely confused when I try to flip it fast."'
      },
      c: {
        id: 'PATIENT C',
        name: 'Linda Forsythe',
        ageSex: '66 / Female',
        vitals: 'Stable (HR 80, BP 130/84)',
        history: 'Linda refuses a walking aid but staggers with a wide-based gait, veering to the left with nearly every step. She is unable to walk heel-to-toe in a straight line.',
        summary: 'A 66-year-old female with a staggered, wide-based gait and left-sided veering.',
        tools: [
          { id: 'ataxia_walk', label: 'TANDEM WALKING TEST' }
        ],
        defaultDialogue: 'Linda: "I feel like I\'m on a rocky boat. I keep drifting to the left and I can\'t walk straight."'
      },
      d: {
        id: 'PATIENT D',
        name: 'Omar Siddiqui',
        ageSex: '34 / Male',
        vitals: 'Stable (HR 66, BP 115/75)',
        history: 'On finger-to-nose testing, Omar\'s hand overshoots the target. Furthermore, his hand begins shaking violently, and this shaking gets worse the closer his finger gets to your target.',
        summary: 'A 34-year-old male whose hand shakes more intensely as it approaches a target.',
        tools: [
          { id: 'tremor_dot', label: 'FINGER-TO-NOSE' }
        ],
        defaultDialogue: 'Omar: "If my hand is resting, it is perfectly still. But as soon as I reach for something, I start shaking like crazy!"'
      }
    }
  },
  {
    number: 5,
    name: 'The Neurochemistry Lab',
    instructions: 'Enter the 4-digit diagnostic PIN to release the locks. Identify the deficient neurotransmitter from the clinical picture (A to D) using the key: <strong>Dopamine=1, Serotonin=2, GABA=3, Glutamate=4, Acetylcholine=5, Norepinephrine=6</strong>.',
    patients: {
      a: {
        id: 'PATIENT A',
        name: 'Bernard Kline',
        ageSex: '64 / Male',
        vitals: 'Stable (HR 70, BP 126/80)',
        history: 'Bernard presents with a progressive resting "pill-rolling" tremor in his right hand. On exam, you note a shuffling gait with small steps, a hunched posture, and a rigid, mask-like facial expression.',
        summary: 'A 64-year-old male presenting with a resting tremor, shuffling gait, rigidity, and a mask-like face.',
        tools: [
          { id: 'observe_tremor', label: 'OBSERVE TREMOR' }
        ],
        defaultDialogue: 'Bernard: "My hand won\'t stop shaking when I\'m just sitting... but if I reach for a cup, it steadies out a bit."'
      },
      b: {
        id: 'PATIENT B',
        name: 'Nadia Farouk',
        ageSex: '29 / Female',
        vitals: 'Stable (HR 72, BP 112/70)',
        history: 'Nadia reports a three-month history of sleeping excessively (hypersomnia), low energy, difficulty concentrating, and a complete loss of interest in her hobbies. There are no abnormal findings on her physical neurological exam.',
        summary: 'A 29-year-old female with persistent hypersomnia, low energy, and anhedonia.',
        tools: [
          { id: 'synapse_scan', label: 'SYNAPSE SCANNER' }
        ],
        defaultDialogue: 'Nadia: "I\'m just so tired all the time... I don\'t enjoy reading or cooking anymore, nothing makes me happy."'
      },
      c: {
        id: 'PATIENT C',
        name: 'Jacob Lim',
        ageSex: '10 / Male',
        vitals: 'Stable (HR 80, BP 98/60)',
        history: 'Jacob\'s teacher reports that he frequently stares blankly for 10–15 seconds at a time while his eyelids flutter. He is completely unresponsive during these episodes, after which he immediately resumes his activity with no confusion.',
        summary: 'A 10-year-old male with brief, unprovoked blank staring episodes accompanied by eyelid fluttering.',
        tools: [
          { id: 'eeg_record', label: 'RECORD EEG' }
        ],
        defaultDialogue: 'Jacob: "What happened? I was just telling you about my school project..."'
      },
      d: {
        id: 'PATIENT D',
        name: 'Constance Avril',
        ageSex: '74 / Female',
        vitals: 'Stable (HR 68, BP 130/82)',
        history: 'Constance\'s daughter is concerned because she gets lost on her own street and forgets conversations from an hour ago. However, she recalls her wedding day in vivid detail. She also struggles to find common words during conversation.',
        summary: 'A 74-year-old female presenting with progressive short-term memory loss and word-finding difficulties.',
        tools: [
          { id: 'memory_test', label: 'MEMORY ASSESSMENT' }
        ],
        defaultDialogue: 'Constance: "My memory isn\'t what it used to be... what were we talking about again?"'
      }
    }
  },
  {
    number: 6,
    name: 'The Angiography Suite',
    instructions: 'Enter the 4-digit diagnostic PIN to release the locks. Identify the occluded artery from the stroke syndrome (A to D) using the key: <strong>Left MCA=1, Right MCA=2, Left ACA=3, Right ACA=4, Left PCA=5, Right PCA=6, Basilar=7</strong>.',
    patients: {
      a: {
        id: 'PATIENT A',
        name: 'Vincent Dumont',
        ageSex: '57 / Male',
        vitals: 'Stable (HR 74, BP 145/92)',
        history: 'Vincent presents with sudden right-sided facial droop and right arm weakness. His speech is slurred and effortful, and he struggles to follow complex verbal commands. Leg strength is completely normal (5/5).',
        summary: 'A 57-year-old male with sudden right face and arm weakness, slurred speech, and comprehension difficulties.',
        tools: [
          { id: 'mca_motor', label: 'MOTOR STRENGTH' }
        ],
        defaultDialogue: 'Vincent: "Arm... weak. Speak... hard. Leg... fine."'
      },
      b: {
        id: 'PATIENT B',
        name: 'Rhea Kapoor',
        ageSex: '43 / Female',
        vitals: 'Stable (HR 70, BP 120/75)',
        history: 'Rhea woke up this morning unable to lift or move her right leg. Her face and arm are completely unaffected, and her speech and understanding are completely normal.',
        summary: 'A 43-year-old female presenting with sudden isolated weakness in her right leg.',
        tools: [
          { id: 'aca_motor', label: 'MOTOR STRENGTH' }
        ],
        defaultDialogue: 'Rhea: "It\'s so strange. My face and arms work perfectly, but my right leg is completely dead weight."'
      },
      c: {
        id: 'PATIENT C',
        name: 'Gerald Obi',
        ageSex: '68 / Male',
        vitals: 'Stable (HR 75, BP 138/85)',
        history: 'Gerald experienced sudden visual loss to the right side in both eyes. He has no physical motor or sensory deficits. On cognitive testing, you note a slight difficulty naming recent visual items.',
        summary: 'A 68-year-old male presenting with sudden right homonymous visual field loss.',
        tools: [
          { id: 'pca_visual', label: 'VISUAL FIELD TEST' }
        ],
        defaultDialogue: 'Gerald: "I can\'t see anything to my right. It\'s like half of my vision is just blacked out."'
      },
      d: {
        id: 'PATIENT D',
        name: 'Miriam Castillo',
        ageSex: '71 / Female',
        vitals: 'Stable (HR 64, BP 125/80)',
        history: 'Miriam presented with double vision and slurred speech, followed by complete paralysis of all four limbs. She is unable to speak or move her face, but is awake, alert, and can track the examiner\'s finger using vertical eye movements.',
        summary: 'A 71-year-old female who is awake but completely paralyzed in all four limbs, retaining only vertical eye movements.',
        tools: [
          { id: 'locked_gaze', label: 'EYE TRACKING' }
        ],
        defaultDialogue: '(Miriam is unable to speak. She blinks once to indicate understanding as she tracks your movements).'
      }
    }
  }
];

// DOM Elements
const introScreen = document.getElementById('intro-screen');
const mainScreen = document.getElementById('main-screen');
const escapeScreen = document.getElementById('escape-screen');
const teamNameInput = document.getElementById('team-name-input');
const accessCodeInput = document.getElementById('access-code-input');

// Access code participants must enter (shared verbally/on-screen by the proctor) before the run starts.
// Change this any time you want to reuse the app with a new code.
const startBtn = document.getElementById('start-btn');
const headerTeamBadge = document.getElementById('header-team-badge');
const teamNameDisplay = document.getElementById('team-name-display');
const timerDisplay = document.getElementById('timer-display');

// Keypad
const pinDisplay = document.getElementById('pin-display');
const keypadWrapper = document.getElementById('keypad-wrapper');
const numKeys = document.querySelectorAll('.btn-num');
const clearKey = document.querySelector('.btn-clear');
const submitKey = document.querySelector('.btn-submit');
const doorIndicator = document.getElementById('door-indicator');
const doorStatusText = document.getElementById('door-status-text');
const lockIllustration = document.getElementById('lock-illustration');

// Modal Elements
const examModal = document.getElementById('exam-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalPatientId = document.getElementById('modal-patient-id');
const vignetteName = document.getElementById('vignette-name');
const vignetteAgeSex = document.getElementById('vignette-age-sex');
const vignetteVitals = document.getElementById('vignette-vitals');
const vignetteText = document.getElementById('vignette-text');
const sandboxToolsContainer = document.getElementById('sandbox-tools-container');
const sandboxInstruction = document.getElementById('sandbox-instruction-text');
const sandboxDialogue = document.getElementById('sandbox-dialogue');
const playgroundArea = document.getElementById('sandbox-playground-area');

// Escape Screen Elements
const finalTimeDisplay = document.getElementById('final-time-display');
const summaryTeamName = document.getElementById('summary-team-name');
const shareBtn = document.getElementById('share-btn');

// Crossword Screen Elements
const appHeader = document.getElementById('app-header');
const crosswordScreen = document.getElementById('crossword-screen');
const crosswordFrame = document.getElementById('crossword-frame');
const startCrosswordBtn = document.getElementById('start-crossword-btn');
const startCrosswordBtnLoss = document.getElementById('start-crossword-btn-loss');

// Combined Summary Screen Elements
const combinedSummaryScreen = document.getElementById('combined-summary-screen');
const combinedRestartBtn = document.getElementById('combined-restart-btn');
const combinedShareBtn = document.getElementById('combined-share-btn');

// SCORING CONFIG - adjust these to change how the final score is calculated
const SCORE_CONFIG = {
  // Room points depend on which attempt solved the room (1st, 2nd, or 3rd try). A room failed on
  // the 3rd wrong attempt scores 0. x6 rooms, max possible = 100*6 = 600.
  roomPointsByAttempt: { 1: 100, 2: 60, 3: 30 },
  roomPointsFailed: 0,

  escapeTimeBonusMax: 200,     // full bonus if escaped instantly, scales down to 0 at the 45-min mark
  crosswordBase: 200,          // flat points for finishing the crossword at all
  crosswordTimeBonusMax: 200,  // full bonus if solved instantly, scales down to 0 at crosswordTimeCapSeconds
  crosswordTimeCapSeconds: 15 * 60 // 15 minutes - matches the crossword's own countdown limit
};
SCORE_CONFIG.maxTotal = (SCORE_CONFIG.roomPointsByAttempt[1] * 6) + SCORE_CONFIG.escapeTimeBonusMax + SCORE_CONFIG.crosswordBase + SCORE_CONFIG.crosswordTimeBonusMax;

// Patient Diagnostic Containers
const containerEyesCN3 = document.getElementById('container-eyes-cn3');
const containerFaceCN7 = document.getElementById('container-face-cn7');
const containerSensoryCN5 = document.getElementById('container-sensory-cn5');
const containerTrackingCN6 = document.getElementById('container-tracking-cn6');
const flashlightBeam = document.getElementById('flashlight-beam');

// INITIALIZATION
function init() {
  setupEventListeners();
  renderRoom();
}

// SETUP EVENT LISTENERS
function setupEventListeners() {
  // Intro screen
  startBtn.addEventListener('click', handleStartGame);
  teamNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleStartGame();
  });
  accessCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleStartGame();
  });

  // Patient cards
  document.querySelectorAll('.patient-card').forEach(card => {
    card.addEventListener('click', () => {
      const patientId = card.getAttribute('data-patient');
      openExamination(patientId);
    });
  });

  // Keypad
  numKeys.forEach(btn => {
    btn.addEventListener('click', () => handleKeyPress(btn.textContent));
  });
  clearKey.addEventListener('click', handleClearPIN);
  submitKey.addEventListener('click', handleSubmitPIN);

  // Modal close
  closeModalBtn.addEventListener('click', closeExamination);
  window.addEventListener('click', (e) => {
    if (e.target === examModal) closeExamination();
  });

  // Escape Screen buttons
  shareBtn.addEventListener('click', handleShareSummary);
  startCrosswordBtn.addEventListener('click', () => handleStartCrossword('escape-screen'));
  startCrosswordBtnLoss.addEventListener('click', () => handleStartCrossword('loss-screen'));
  combinedRestartBtn.addEventListener('click', handleRestart);

  // Proctor-only reset shortcut (Ctrl+Shift+R). No visible button on the win/loss/crossword
  // screens so participants can't reset mid-run or re-roll their result; the proctor can still
  // reset between teams using this key combo from anywhere in the app.
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'R' || e.key === 'r')) {
      e.preventDefault();
      if (confirm('Proctor reset: clear this run and return to the start screen?')) {
        handleRestart();
      }
    }
  });

  // Trigeminal Node Clicks
  document.querySelectorAll('.sensory-node').forEach(node => {
    node.addEventListener('click', (e) => {
      handleSensoryNodeClick(e.target);
    });
  });

  // Global Keypad Typing
  window.addEventListener('keydown', (e) => {
    if (introScreen.classList.contains('active')) return;
    if (state.gameCompleted) return;
    
    if (e.key >= '0' && e.key <= '9') {
      handleKeyPress(e.key);
    } else if (e.key === 'Backspace') {
      if (state.pinCode.length > 0) {
        state.pinCode = state.pinCode.slice(0, -1);
        updateKeypadDisplay();
      }
    } else if (e.key === 'Escape' || e.key === 'Delete') {
      handleClearPIN();
    } else if (e.key === 'Enter') {
      handleSubmitPIN();
    }
  });
}

// RENDER ROOM CONFIG
function renderRoom() {
  const currentRoomData = roomsData[state.currentRoom - 1];
  
  // Render titles
  document.getElementById('room-header-title').textContent = `CLINICAL ESCAPE ROOM • ROOM ${state.currentRoom}/6`;
  document.getElementById('room-title-display').textContent = `ROOM ${state.currentRoom}: ${currentRoomData.name.toUpperCase()}`;
  document.getElementById('terminal-instructions-text').innerHTML = currentRoomData.instructions;
  
  // Update Patient Cards content
  ['a', 'b', 'c', 'd'].forEach(letter => {
    const data = currentRoomData.patients[letter];
    const card = document.getElementById(`card-patient-${letter}`);
    card.querySelector('.patient-name').textContent = data.name;
    card.querySelector('.patient-summary').textContent = data.summary;
    
    // Reset status badges
    card.classList.remove('examined');
    const badge = document.getElementById(`badge-patient-${letter}`);
    badge.className = 'status-badge unexamined';
    badge.textContent = 'Unexamined';
    card.querySelector('.ekg-line').style.stroke = '';
  });
  
  // Reset PinCode and status
  state.pinCode = '';
  state.wrongPinAttempts = 0;
  state.examinedPatients = { a: false, b: false, c: false, d: false };
  updateKeypadDisplay();
}

// TIMER FUNCTIONALITY
function startTimer() {
  state.startTime = Date.now();
  state.timerInterval = setInterval(updateTimer, 100);
}

// STOP TIMER
function stopTimer() {
  clearInterval(state.timerInterval);
}

// UPDATE COUNTDOWN
function updateTimer() {
  const elapsed = Date.now() - state.startTime;
  state.timeRemaining = Math.max(0, TOTAL_TIME_MS - elapsed);
  timerDisplay.textContent = formatTime(state.timeRemaining);
  
  if (state.timeRemaining <= 0) {
    handleEscapeFailureTimeout();
  }
}

// FORMAT TIME
function formatTime(ms) {
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const tenths = Math.floor((ms % 1000) / 100);
  
  const minStr = minutes.toString().padStart(2, '0');
  const secStr = seconds.toString().padStart(2, '0');
  return `${minStr}:${secStr}.${tenths}`;
}

// GAME FLOW ACTIONS
async function handleStartGame() {
  const teamInput = teamNameInput.value.trim();
  if (!teamInput) {
    alert('Please enter a team name to initialize the diagnostic systems.');
    return;
  }

  const codeInput = accessCodeInput.value.trim().toUpperCase();

  async function loginTeam(teamName, accessCode) {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        team_name: teamName,
        code: accessCode
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
  }

  try {
    const data = await loginTeam(teamInput, codeInput);

    if (data.message === 'Participant created successfully') {
      state.teamName = teamInput;
      teamNameDisplay.textContent = state.teamName;

      introScreen.classList.remove('active');
      mainScreen.classList.add('active');

      headerTeamBadge.style.display = 'flex';
      timerDisplay.style.display = 'block';

      state.currentRoom = 1;
      renderRoom();
      startTimer();
    } else {
      alert(data.message || 'Invalid access code. Please try again.');
      accessCodeInput.value = '';
      accessCodeInput.focus();
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while trying to start the game. Please check your connection and try again.');
    accessCodeInput.value = '';
    accessCodeInput.focus();
  }
}

function handleRestart() {
  stopTimer();
  state.timeRemaining = TOTAL_TIME_MS;
  state.gameCompleted = false;
  state.pinCode = '';
  state.wrongPinAttempts = 0;
  state.roomsSucceeded = 0;
  state.roomsFailed = 0;
  state.roomAttemptLog = [];
  state.activePatient = null;
  state.currentRoom = 1;
  state.examinedPatients = { a: false, b: false, c: false, d: false };
  state.cn5CheckedNodes = {
    'l-v1': false, 'l-v2': false, 'l-v3': false,
    'r-v1': false, 'r-v2': false, 'r-v3': false
  };
  
  // Reset UI elements
  pinDisplay.textContent = '_ _ _ _';
  doorIndicator.className = 'status-indicator';
  doorStatusText.textContent = 'LOCKED';
  doorStatusText.className = 'glow-text-pink';
  lockIllustration.className = 'lock-art';
  
  document.querySelectorAll('.sensory-node').forEach(node => {
    node.className = 'sensory-node';
  });

  resetFaceCN7();
  
  escapeScreen.classList.remove('active');
  document.getElementById('loss-screen').classList.remove('active');
  crosswordScreen.classList.remove('active');
  combinedSummaryScreen.classList.remove('active');
  crosswordFrame.src = 'about:blank';
  state.crosswordStats = null;
  appHeader.style.display = '';
  introScreen.classList.add('active');
  headerTeamBadge.style.display = 'none';
  timerDisplay.style.display = 'none';
  teamNameInput.value = '';
  accessCodeInput.value = '';
}

function handleShareSummary() {
  const timeTaken = TOTAL_TIME_MS - state.timeRemaining;
  const summaryText = `🧠 Neuroscience Olympiad - Escape Room Completed! 🧠\n👥 Team: ${state.teamName}\n⏱️ Escape Time: ${formatTime(timeTaken)}\n📊 STATS: Rooms Succeeded: ${state.roomsSucceeded}/6 | Rooms Failed: ${state.roomsFailed}/6\n🏥 STATUS: Clinical run completed!`;
  
  navigator.clipboard.writeText(summaryText)
    .then(() => {
      alert('Run summary successfully copied to clipboard! You can send this to the grading panels.');
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
      alert('Could not copy summary automatically. Time: ' + formatTime(timeTaken));
    });
}

// PATIENT EXAMINATION SYSTEM
function openExamination(patientId) {
  state.activePatient = patientId;
  const roomData = roomsData[state.currentRoom - 1];
  const data = roomData.patients[patientId];
  
  modalPatientId.textContent = `${data.id} - CLINICAL INVESTIGATION`;
  vignetteName.textContent = data.name;
  vignetteAgeSex.textContent = data.ageSex;
  vignetteVitals.textContent = data.vitals;
  vignetteText.textContent = data.history;
  
  // Render tools
  sandboxToolsContainer.innerHTML = '';
  data.tools.forEach((tool, index) => {
    const btn = document.createElement('button');
    btn.className = `tool-btn ${index === 0 ? 'active' : ''}`;
    btn.textContent = tool.label;
    btn.setAttribute('data-tool', tool.id);
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectTool(patientId, tool.id);
    });
    sandboxToolsContainer.appendChild(btn);
  });
  
  // Set default tool
  const defaultTool = data.tools[0].id;
  state.activeTools[patientId] = defaultTool;
  
  // Display target patient screen layout
  hideAllDiagnosticContainers();
  cleanupSandboxListeners();
  showDiagnosticContainer(state.currentRoom, patientId);
  
  selectTool(patientId, defaultTool);
  examModal.classList.add('active');
}

function closeExamination() {
  cleanupSandboxListeners();
  
  // Mark card as examined
  if (state.activePatient) {
    const pId = state.activePatient;
    state.examinedPatients[pId] = true;
    
    const card = document.getElementById(`card-patient-${pId}`);
    card.classList.add('examined');
    
    const badge = document.getElementById(`badge-patient-${pId}`);
    badge.className = 'status-badge examined';
    badge.textContent = 'Examined';
    
    // Change EKG color to cyan for examined
    card.querySelector('.ekg-line').style.stroke = 'var(--blue-neon)';
    
    state.activePatient = null;
  }
  
  examModal.classList.remove('active');
}

function selectTool(patientId, toolId) {
  state.activeTools[patientId] = toolId;
  const currentRoomData = roomsData[state.currentRoom - 1];
  sandboxDialogue.textContent = currentRoomData.patients[patientId].defaultDialogue;
  
  if (state.currentRoom === 1) {
    if (patientId === 'a') {
      if (toolId === 'flashlight') {
        sandboxInstruction.textContent = 'Move flashlight beam over Arthur\'s eyes to check pupillary reflex.';
        flashlightBeam.style.display = 'block';
        document.querySelector('#eye-right-cn3 .eyelid-overlay').style.height = '';
      } else if (toolId === 'lift') {
        sandboxInstruction.textContent = 'Click and hold the playground area to lift the ptotic right eyelid.';
        flashlightBeam.style.display = 'none';
      }
    } else if (patientId === 'b') {
      sandboxInstruction.textContent = 'Select actions above to observe facial expressions.';
      if (toolId === 'smile') {
        triggerSmileCN7();
      } else if (toolId === 'eyebrows') {
        triggerEyebrowsCN7();
      } else if (toolId === 'blink') {
        triggerBlinkCN7();
      }
    } else if (patientId === 'c') {
      if (toolId === 'cotton') {
        sandboxInstruction.textContent = 'Click sensory nodes on the face map to check touch sensation.';
      } else if (toolId === 'jaw') {
        sandboxInstruction.textContent = 'Click on Charles\' face map to test masseter contraction strength.';
        sandboxDialogue.textContent = 'Click face to perform jaw muscle test.';
      }
    } else if (patientId === 'd') {
      sandboxInstruction.textContent = 'Move cursor inside the playground. Observe both eyes track the target dot.';
    }
  } else if (state.currentRoom === 2) {
    if (patientId === 'a') {
      sandboxInstruction.textContent = 'Select one of the behavioral scenarios above to observe Robert\'s reactions.';
    } else if (patientId === 'b') {
      sandboxInstruction.textContent = 'Click the conversational query button to attempt speech evaluation.';
    } else if (patientId === 'c') {
      sandboxInstruction.textContent = 'Click different dots in the grid to map Marcus\'s visual fields.';
    } else if (patientId === 'd') {
      sandboxInstruction.textContent = 'Click on the food items to serve them and see which ones Priya notices.';
    }
  } else if (state.currentRoom === 3) {
    if (patientId === 'a') {
      sandboxInstruction.textContent = 'Click either the LEFT or RIGHT side of the body canvas to test tactile sensory pain response.';
    } else if (patientId === 'b') {
      sandboxInstruction.textContent = 'Click inside the sandbox playground to trigger motor limb assessment.';
    } else if (patientId === 'c') {
      sandboxInstruction.textContent = 'Click the button below to trigger horizontal gaze and tracking assessment.';
    } else if (patientId === 'd') {
      sandboxInstruction.textContent = 'Observe the pineal compression circadian hormone chart.';
    }
  } else if (state.currentRoom === 4) {
    if (patientId === 'a') {
      sandboxInstruction.textContent = 'Click the hammer button to tap the patellar tendon and check the reflex response.';
    } else if (patientId === 'b') {
      sandboxInstruction.textContent = 'Click the alternation button to test pronation and supination hand speed.';
    } else if (patientId === 'c') {
      sandboxInstruction.textContent = 'Click the tandem walking test button to observe Linda\'s walking line.';
    } else if (patientId === 'd') {
      sandboxInstruction.textContent = 'Move your mouse inside the playground towards the target. Observe Omar\'s finger tracking.';
    }
  } else if (state.currentRoom === 5) {
    if (patientId === 'a') {
      sandboxInstruction.textContent = 'Observe Bernard\'s hand tremor, or test his strength using the grip button.';
    } else if (patientId === 'b') {
      sandboxInstruction.textContent = 'Click the scan button to analyze neurotransmitter density inside the synaptic cleft.';
    } else if (patientId === 'c') {
      sandboxInstruction.textContent = 'Click the Record EEG button to monitor Jacob\'s brain activity.';
    } else if (patientId === 'd') {
      sandboxInstruction.textContent = 'Click Register to teach Constance three words, then click Test Recall to evaluate her delayed memory.';
    }
  } else if (state.currentRoom === 6) {
    if (patientId === 'a') {
      sandboxInstruction.textContent = 'Click the Assess button to map Vincent\'s motor strength profile.';
    } else if (patientId === 'b') {
      sandboxInstruction.textContent = 'Click the Assess button to map Rhea\'s motor strength profile.';
    } else if (patientId === 'c') {
      sandboxInstruction.textContent = 'Click dots in the visual grid to evaluate Gerald\'s visual fields.';
    } else if (patientId === 'd') {
      sandboxInstruction.textContent = 'Move your mouse vertically inside the playground. Observe Miriam\'s eye tracking.';
    }
  }
}

// SANDBOX CLEANUP
let activeListeners = [];
function cleanupSandboxListeners() {
  activeListeners.forEach(item => {
    // If it's a custom intervals cleanup
    if (item.type === 'destroy') {
      item.target.removeEventListener();
    } else {
      item.target.removeEventListener(item.type, item.listener);
    }
  });
  activeListeners = [];
  playgroundArea.style.cursor = '';
}

function addSandboxListener(target, type, listener) {
  target.addEventListener(type, listener);
  activeListeners.push({ target, type, listener });
}

function hideAllDiagnosticContainers() {
  containerEyesCN3.style.display = 'none';
  containerFaceCN7.style.display = 'none';
  containerSensoryCN5.style.display = 'none';
  containerTrackingCN6.style.display = 'none';
  flashlightBeam.style.display = 'none';
  
  // Room 2
  document.getElementById('container-decision-r2a').style.display = 'none';
  document.getElementById('container-speech-r2b').style.display = 'none';
  document.getElementById('container-visual-r2c').style.display = 'none';
  document.getElementById('container-neglect-r2d').style.display = 'none';
  
  // Room 3
  document.getElementById('container-pain-r3a').style.display = 'none';
  document.getElementById('container-ballismus-r3b').style.display = 'none';
  document.getElementById('container-nystagmus-r3c').style.display = 'none';
  document.getElementById('container-circadian-r3d').style.display = 'none';
  
  // Room 4
  document.getElementById('container-reflex-r4a').style.display = 'none';
  document.getElementById('container-dysdiad-r4b').style.display = 'none';
  document.getElementById('container-ataxia-r4c').style.display = 'none';
  document.getElementById('container-tremor-r4d').style.display = 'none';

  // Room 5
  document.getElementById('container-parkinson-r5a').style.display = 'none';
  document.getElementById('container-synapse-r5b').style.display = 'none';
  document.getElementById('container-eeg-r5c').style.display = 'none';
  document.getElementById('container-memory-r5d').style.display = 'none';

  // Room 6
  document.getElementById('container-mca-r6a').style.display = 'none';
  document.getElementById('container-aca-r6b').style.display = 'none';
  document.getElementById('container-visual-r6c').style.display = 'none';
  document.getElementById('container-basilar-r6d').style.display = 'none';
}

function showDiagnosticContainer(roomNum, patientId) {
  if (roomNum === 1) {
    if (patientId === 'a') {
      containerEyesCN3.style.display = 'flex';
      setupPatientAListeners();
    } else if (patientId === 'b') {
      containerFaceCN7.style.display = 'block';
      setupPatientBListeners();
    } else if (patientId === 'c') {
      containerSensoryCN5.style.display = 'block';
      setupPatientCListeners();
    } else if (patientId === 'd') {
      containerTrackingCN6.style.display = 'flex';
      setupPatientDListeners();
    }
  } else if (roomNum === 2) {
    if (patientId === 'a') {
      document.getElementById('container-decision-r2a').style.display = 'flex';
      setupRoom2PatientAListeners();
    } else if (patientId === 'b') {
      document.getElementById('container-speech-r2b').style.display = 'flex';
      setupRoom2PatientBListeners();
    } else if (patientId === 'c') {
      document.getElementById('container-visual-r2c').style.display = 'flex';
      setupRoom2PatientCListeners();
    } else if (patientId === 'd') {
      document.getElementById('container-neglect-r2d').style.display = 'flex';
      setupRoom2PatientDListeners();
    }
  } else if (roomNum === 3) {
    if (patientId === 'a') {
      document.getElementById('container-pain-r3a').style.display = 'flex';
      setupRoom3PatientAListeners();
    } else if (patientId === 'b') {
      document.getElementById('container-ballismus-r3b').style.display = 'flex';
      setupRoom3PatientBListeners();
    } else if (patientId === 'c') {
      document.getElementById('container-nystagmus-r3c').style.display = 'flex';
      setupRoom3PatientCListeners();
    } else if (patientId === 'd') {
      document.getElementById('container-circadian-r3d').style.display = 'flex';
      setupRoom3PatientDListeners();
    }
  } else if (roomNum === 4) {
    if (patientId === 'a') {
      document.getElementById('container-reflex-r4a').style.display = 'flex';
      setupRoom4PatientAListeners();
    } else if (patientId === 'b') {
      document.getElementById('container-dysdiad-r4b').style.display = 'flex';
      setupRoom4PatientBListeners();
    } else if (patientId === 'c') {
      document.getElementById('container-ataxia-r4c').style.display = 'flex';
      setupRoom4PatientCListeners();
    } else if (patientId === 'd') {
      document.getElementById('container-tremor-r4d').style.display = 'flex';
      setupRoom4PatientDListeners();
    }
  } else if (roomNum === 5) {
    if (patientId === 'a') {
      document.getElementById('container-parkinson-r5a').style.display = 'flex';
      setupRoom5PatientAListeners();
    } else if (patientId === 'b') {
      document.getElementById('container-synapse-r5b').style.display = 'flex';
      setupRoom5PatientBListeners();
    } else if (patientId === 'c') {
      document.getElementById('container-eeg-r5c').style.display = 'flex';
      setupRoom5PatientCListeners();
    } else if (patientId === 'd') {
      document.getElementById('container-memory-r5d').style.display = 'flex';
      setupRoom5PatientDListeners();
    }
  } else if (roomNum === 6) {
    if (patientId === 'a') {
      document.getElementById('container-mca-r6a').style.display = 'flex';
      setupRoom6PatientAListeners();
    } else if (patientId === 'b') {
      document.getElementById('container-aca-r6b').style.display = 'flex';
      setupRoom6PatientBListeners();
    } else if (patientId === 'c') {
      document.getElementById('container-visual-r6c').style.display = 'flex';
      setupRoom6PatientCListeners();
    } else if (patientId === 'd') {
      document.getElementById('container-basilar-r6d').style.display = 'flex';
      setupRoom6PatientDListeners();
    }
  }
}

// ==========================================
// ROOM 1 (CRANIAL NERVES) DIAGNOSTIC LISTENERS
// ==========================================
function setupPatientAListeners() {
  const eyeL = document.getElementById('eye-left-cn3');
  const eyeR = document.getElementById('eye-right-cn3');
  
  const handleMouseMove = (e) => {
    if (state.activeTools['a'] !== 'flashlight') return;
    
    const rect = playgroundArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    flashlightBeam.style.left = `${x - 60}px`;
    flashlightBeam.style.top = `${y - 60}px`;
    
    const pupilLRect = eyeL.getBoundingClientRect();
    const pupilRRect = eyeR.getBoundingClientRect();
    
    const pupilLCenter = {
      x: pupilLRect.left + pupilLRect.width / 2,
      y: pupilLRect.top + pupilLRect.height / 2
    };
    const pupilRCenter = {
      x: pupilRRect.left + pupilRRect.width / 2,
      y: pupilRRect.top + pupilRRect.height / 2
    };
    
    const distL = Math.hypot(e.clientX - pupilLCenter.x, e.clientY - pupilLCenter.y);
    const distR = Math.hypot(e.clientX - pupilRCenter.x, e.clientY - pupilRCenter.y);
    
    const pupilL = eyeL.querySelector('.pupil');
    const pupilR = eyeR.querySelector('.pupil');
    
    let sizeL = '';
    let sizeR = '';
    
    if (distL < 45) {
      sizeL = '8px';
      sizeR = '32px';
      sandboxDialogue.textContent = 'Arthur: "Ah, that light is bright! The left pupil shrinks immediately, but the right pupil remains wide and unresponsive."';
    } else if (distR < 45) {
      sizeL = '8px';
      sizeR = '32px';
      sandboxDialogue.textContent = 'Arthur: "The light is shone in my right eye. My right pupil remains wide open (blown pupil), but my left pupil constricts consensually!"';
    } else {
      sizeL = '';
      sizeR = '';
      sandboxDialogue.textContent = 'Arthur: "My right eyelid feels like a lead weight. I can barely lift it."';
    }
    
    pupilL.style.width = sizeL;
    pupilL.style.height = sizeL;
    pupilR.style.width = sizeR;
    pupilR.style.height = sizeR;
  };
  
  const handleMouseDown = () => {
    if (state.activeTools['a'] !== 'lift') return;
    const eyelidR = eyeR.querySelector('.eyelid-overlay');
    eyelidR.style.height = '0%';
    sandboxDialogue.textContent = 'You lift Arthur\'s right eyelid. The eye underneath rests in a "down and out" position. He cannot track your finger upward or inward, indicating paralysis of the superior/inferior/medial rectus & inferior oblique muscles.';
  };
  
  const handleMouseUp = () => {
    if (state.activeTools['a'] !== 'lift') return;
    const eyelidR = eyeR.querySelector('.eyelid-overlay');
    eyelidR.style.height = '55%';
    sandboxDialogue.textContent = 'Arthur: "Thank you... my right eye shuts immediately when you let go."';
  };
  
  addSandboxListener(playgroundArea, 'mousemove', handleMouseMove);
  addSandboxListener(playgroundArea, 'mousedown', handleMouseDown);
  addSandboxListener(playgroundArea, 'mouseup', handleMouseUp);
  addSandboxListener(playgroundArea, 'mouseleave', handleMouseUp);
}

function setupPatientBListeners() {
  // Beatrix Miller (CN VII) listener logic is handled by tool triggers (smile, eyebrows, blink)
}

function resetFaceCN7() {
  const eyebrowL = document.getElementById('eyebrow-l-cn7');
  const eyebrowR = document.getElementById('eyebrow-r-cn7');
  const eyeL = document.getElementById('eye-l-cn7');
  const eyeR = document.getElementById('eye-r-cn7');
  const pupilL = document.getElementById('pupil-l-cn7');
  const pupilR = document.getElementById('pupil-r-cn7');
  const mouth = document.getElementById('mouth-cn7');
  
  eyebrowL.setAttribute('d', 'M115 70 Q130 70 145 70');
  eyebrowR.setAttribute('d', 'M55 70 Q70 65 85 72');
  eyeL.setAttribute('d', 'M120 85 Q130 75 140 85 Q130 95 120 85 Z');
  eyeR.setAttribute('d', 'M60 85 Q70 75 80 85 Q70 95 60 85 Z');
  pupilL.style.display = '';
  pupilR.style.display = '';
  mouth.setAttribute('d', 'M70 150 Q100 150 130 150');
}

function triggerSmileCN7() {
  resetFaceCN7();
  const mouth = document.getElementById('mouth-cn7');
  mouth.setAttribute('d', 'M70 158 Q100 155 130 135');
  sandboxDialogue.textContent = 'Beatrix smiles. Only the left side of her mouth lifts. The right side is paralyzed and flat, showing severe asymmetric weakness (facial droop).';
}

function triggerEyebrowsCN7() {
  resetFaceCN7();
  const eyebrowL = document.getElementById('eyebrow-l-cn7');
  eyebrowL.setAttribute('d', 'M115 58 Q130 50 145 58');
  sandboxDialogue.textContent = 'Beatrix wrinkles her forehead. The left forehead creases and left eyebrow rises, but the right side remains completely smooth and motionless.';
}

function triggerBlinkCN7() {
  resetFaceCN7();
  const eyeL = document.getElementById('eye-l-cn7');
  const pupilL = document.getElementById('pupil-l-cn7');
  eyeL.setAttribute('d', 'M120 85 Q130 85 140 85');
  pupilL.style.display = 'none';
  sandboxDialogue.textContent = 'Beatrix tries to close both eyes. Her left eye shuts completely, but her right eyelid remains wide open (lagophthalmos). Her right pupil rolls upward slightly (Bell\'s phenomenon).';
}

function setupPatientCListeners() {
  const handleClick = (e) => {
    if (state.activeTools['c'] !== 'jaw') return;
    if (e.target.classList.contains('sensory-node')) return;
    sandboxDialogue.textContent = 'You test Charles\' jaw muscles. When he clenches his teeth, the left temporalis/masseter muscle contracts firmly. The right side is weak and flabby. On opening, his jaw deviates to the right (affected side due to weak right pterygoid muscles).';
  };
  addSandboxListener(playgroundArea, 'click', handleClick);
}

function handleSensoryNodeClick(target) {
  if (state.activePatient !== 'c' || state.currentRoom !== 1) return;
  const tool = state.activeTools['c'];
  if (tool !== 'cotton') return;
  
  const side = target.getAttribute('data-side');
  const branch = target.getAttribute('data-branch').toUpperCase();
  const nodeKey = `${side}-${target.getAttribute('data-branch')}`;
  
  target.classList.add('active-touch');
  setTimeout(() => target.classList.remove('active-touch'), 800);
  
  const region = branch === 'V1' ? 'forehead' : (branch === 'V2' ? 'cheek' : 'jaw');
  
  if (side === 'left') {
    target.classList.add('checked');
    state.cn5CheckedNodes[nodeKey] = true;
    sandboxDialogue.textContent = `Charles: "Ooh, that tickles! I feel the cotton wisp perfectly on my left ${region}."`;
  } else {
    target.classList.add('numb');
    state.cn5CheckedNodes[nodeKey] = true;
    sandboxDialogue.textContent = `Charles: "Nothing. I don't feel a thing on my right ${region}. It's completely numb!"`;
  }
}

function setupPatientDListeners() {
  playgroundArea.style.cursor = 'none';
  const targetDot = document.getElementById('tracking-target');
  const eyeL = document.getElementById('eye-left-cn6');
  const eyeR = document.getElementById('eye-right-cn6');
  const maxRadius = 11;
  
  const handleMouseMove = (e) => {
    const rect = playgroundArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    targetDot.style.left = `${x - 7}px`;
    targetDot.style.top = `${y - 7}px`;
    
    const rectL = eyeL.getBoundingClientRect();
    const rectR = eyeR.getBoundingClientRect();
    
    const centerL = {
      x: rectL.left + rectL.width / 2 - rect.left,
      y: rectL.top + rectL.height / 2 - rect.top
    };
    
    const centerR = {
      x: rectR.left + rectR.width / 2 - rect.left,
      y: rectR.top + rectR.height / 2 - rect.top
    };
    
    const dxL = x - centerL.x;
    const dyL = y - centerL.y;
    const distL = Math.hypot(dxL, dyL) || 1;
    const txL = (dxL / distL) * maxRadius;
    const tyL = (dyL / distL) * maxRadius;
    
    const dxR = x - centerR.x;
    const dyR = y - centerR.y;
    const distR = Math.hypot(dxR, dyR) || 1;
    
    let txR = (dxR / distR) * maxRadius;
    let tyR = (dyR / distR) * maxRadius;
    
    if (dxR < 0) {
      txR = 2;
    }
    
    if (Math.abs(dxR) < 30) {
      txR = 5;
    }
    
    eyeL.querySelector('.iris').style.transform = `translate(${txL}px, ${tyL}px)`;
    eyeR.querySelector('.iris').style.transform = `translate(${txR}px, ${tyR}px)`;
    
    if (dxL < -40) {
      sandboxDialogue.textContent = 'Diana: "Looking left splits my vision completely. My right eye won\'t turn outward!" (Note: Left eye turns medially/inward, right eye fails to abduct/turn left).';
    } else if (dxL > 40) {
      sandboxDialogue.textContent = 'Diana: "Ah, looking right is fine. My eyes align correctly when tracking that way." (Note: Both pupils move to the right normally).';
    } else {
      sandboxDialogue.textContent = 'At rest, Diana\'s right eye exhibits medial strabismus (inward squint), showing weakness in the lateral rectus muscle.';
    }
  };
  
  addSandboxListener(playgroundArea, 'mousemove', handleMouseMove);
}

// ==========================================
// ROOM 2 (CEREBRUM) DIAGNOSTIC LISTENERS
// ==========================================
function setupRoom2PatientAListeners() {
  const btns = document.querySelectorAll('#container-decision-r2a .scenario-btn');
  btns.forEach(btn => {
    const handleScenarioClick = (e) => {
      const scenario = e.target.getAttribute('data-scenario');
      let text = '';
      if (scenario === 'funeral') {
        text = 'Robert cracks a joke: "Well, at least Mom won\'t have to complain about our heating bills anymore!" He laughs loudly, showing zero social inhibition.';
      } else if (scenario === 'planning') {
        text = 'Robert: "Plan? Let\'s just launch the product tomorrow. We don\'t need a budget or details, those are boring!" He is incapable of sequencing plans.';
      } else if (scenario === 'risk') {
        text = 'Robert: "I\'ve just invested my retirement fund in a start-up that makes shoes for squirrels. Ground floor opportunity!" He displays poor risk appraisal.';
      }
      sandboxDialogue.textContent = text;
    };
    addSandboxListener(btn, 'click', handleScenarioClick);
  });
}

function setupRoom2PatientBListeners() {
  const btn = document.getElementById('btn-trigger-speech');
  const bars = document.querySelectorAll('#container-speech-r2b .wave-bar');
  
  const handleSpeechClick = () => {
    bars.forEach(bar => bar.classList.add('animated'));
    setTimeout(() => {
      bars.forEach(bar => bar.classList.remove('animated'));
    }, 2000);
    
    const responses = [
      'Elena: "The flibberish on the wall went to the blue sky of run, you know? It\'s so clear!"',
      'Elena: "I was looking for my dog-clock because the sky needs to spin the carpet now."',
      'Elena: "Every morning the tree walks to the bakery to buy some glass wind." (She smiles warmly, speaking fluently and smoothly).'
    ];
    sandboxDialogue.textContent = responses[Math.floor(Math.random() * responses.length)];
  };
  addSandboxListener(btn, 'click', handleSpeechClick);
}

function setupRoom2PatientCListeners() {
  const points = document.querySelectorAll('#container-visual-r2c .vf-point');
  points.forEach(p => p.className = 'vf-point ' + p.className.split(' ')[1]);
  
  points.forEach(point => {
    const handlePointClick = (e) => {
      const p = e.target;
      const isRight = p.classList.contains('right-field');
      
      if (isRight) {
        p.classList.add('not-seen');
        p.classList.remove('seen');
        sandboxDialogue.textContent = 'Marcus: "Nothing... there is just darkness on the right side. Is the machine working?"';
      } else {
        p.classList.add('seen');
        p.classList.remove('not-seen');
        sandboxDialogue.textContent = 'Marcus: "Yes! A bright green light flashed clearly on the left side."';
      }
    };
    addSandboxListener(point, 'click', handlePointClick);
  });
}

// Priya Neglect Plate
function setupRoom2PatientDListeners() {
  const foods = document.querySelectorAll('#container-neglect-r2d .food-item');
  foods.forEach(f => f.classList.remove('eaten'));
  
  foods.forEach(food => {
    const handleFoodClick = (e) => {
      const item = e.target;
      const side = item.getAttribute('data-side');
      
      if (side === 'left') {
        sandboxDialogue.textContent = 'Priya: "What cherries/bread/salad? The left side of the plate is completely empty. Why are you pointing there?"';
      } else {
        item.classList.add('eaten');
        sandboxDialogue.textContent = `Priya eats the ${item.textContent}: "Mmm, that was tasty!"`;
        
        const eatenRight = document.querySelectorAll('#container-neglect-r2d .food-item[data-side="right"].eaten').length;
        if (eatenRight === 3) {
          setTimeout(() => {
            sandboxDialogue.textContent = 'Priya: "Ah, I\'m fully finished! My plate is completely clean." (Note: She has left three foods untouched on the left half).';
          }, 1500);
        }
      }
    };
    addSandboxListener(food, 'click', handleFoodClick);
  });
}

// ==========================================
// ROOM 3 (DIENCEPHALON) DIAGNOSTIC LISTENERS
// ==========================================
function setupRoom3PatientAListeners() {
  const leftSide = document.getElementById('body-side-left');
  const rightSide = document.getElementById('body-side-right');
  
  leftSide.className = 'body-side';
  rightSide.className = 'body-side';
  
  const handleLeftClick = () => {
    leftSide.classList.add('active-pain');
    rightSide.classList.remove('active-normal');
    sandboxDialogue.textContent = 'Walter: "AHHH! Stop! That wisp feels like a red-hot branding iron on my left side! It is excruciating!" (Tactile allodynia).';
    setTimeout(() => leftSide.classList.remove('active-pain'), 1500);
  };
  
  const handleRightClick = () => {
    rightSide.classList.add('active-normal');
    leftSide.classList.remove('active-pain');
    sandboxDialogue.textContent = 'Walter: "That is fine. Just a light tickle of cotton on my right arm. Normal sensation."';
    setTimeout(() => rightSide.classList.remove('active-normal'), 1500);
  };
  
  addSandboxListener(leftSide, 'click', handleLeftClick);
  addSandboxListener(rightSide, 'click', handleRightClick);
}

function setupRoom3PatientBListeners() {
  const limb = document.getElementById('ballismus-limb');
  let swingInterval = null;
  
  const startSwing = () => {
    if (swingInterval) clearInterval(swingInterval);
    
    let ticks = 0;
    swingInterval = setInterval(() => {
      const angle = (Math.random() * 150 - 75).toFixed(0);
      limb.style.transform = `translate(-50%,0) rotate(${angle}deg)`;
      ticks++;
      
      if (ticks > 15) {
        clearInterval(swingInterval);
        limb.style.transform = 'translate(-50%,0) rotate(0deg)';
        sandboxDialogue.textContent = 'Natasha\'s right arm suddenly stops flinging for a moment, then spasms again.';
      }
    }, 120);
    
    sandboxDialogue.textContent = 'Natasha\'s arm flings in a violent, high-amplitude circular trajectory (hemiballismus).';
  };
  
  addSandboxListener(playgroundArea, 'click', startSwing);
  startSwing();
}

function setupRoom3PatientCListeners() {
  playgroundArea.style.cursor = 'none';
  const targetDot = document.getElementById('nystagmus-target');
  targetDot.style.display = 'block';
  
  const eyeL = document.getElementById('nystagmus-eye-left');
  const eyeR = document.getElementById('nystagmus-eye-right');
  const irisL = eyeL.querySelector('.iris');
  const irisR = eyeR.querySelector('.iris');
  const maxRadius = 10;
  
  let mouseX = 150;
  let mouseY = 60;
  
  const handleMouseMove = (e) => {
    const rect = playgroundArea.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  };
  
  addSandboxListener(playgroundArea, 'mousemove', handleMouseMove);
  
  let animationFrameId = null;
  const updateEyes = () => {
    targetDot.style.left = `${mouseX - 7}px`;
    targetDot.style.top = `${mouseY - 7}px`;
    
    const rectL = eyeL.getBoundingClientRect();
    const rectR = eyeR.getBoundingClientRect();
    const rectPlay = playgroundArea.getBoundingClientRect();
    
    const centerL = {
      x: rectL.left + rectL.width / 2 - rectPlay.left,
      y: rectL.top + rectL.height / 2 - rectPlay.top
    };
    const centerR = {
      x: rectR.left + rectR.width / 2 - rectPlay.left,
      y: rectR.top + rectR.height / 2 - rectPlay.top
    };
    
    const dxL = mouseX - centerL.x;
    const dyL = mouseY - centerL.y;
    const distL = Math.hypot(dxL, dyL) || 1;
    let txL = (dxL / distL) * maxRadius;
    let tyL = (dyL / distL) * maxRadius;
    
    const dxR = mouseX - centerR.x;
    const dyR = mouseY - centerR.y;
    const distR = Math.hypot(dxR, dyR) || 1;
    let txR = (dxR / distR) * maxRadius;
    let tyR = (dyR / distR) * maxRadius;
    
    const isPatientRightGaze = mouseX < 120;
    
    if (isPatientRightGaze) {
      const jitter = Math.sin(Date.now() * 0.08) * 5;
      txL += jitter;
      txR += jitter;
      sandboxDialogue.textContent = 'Daniel: "Looking right makes everything spin! My eyes are twitching!" (Note: Both eyes display rapid horizontal gaze-evoked nystagmus on rightward gaze).';
    } else {
      sandboxDialogue.textContent = 'Daniel tracks the dot. Gaze is stable and aligned on left/center tracking.';
    }
    
    irisL.style.transform = `translate(${txL}px, ${tyL}px)`;
    irisR.style.transform = `translate(${txR}px, ${tyR}px)`;
    
    animationFrameId = requestAnimationFrame(updateEyes);
  };
  
  updateEyes();
  
  activeListeners.push({
    target: { removeEventListener: () => cancelAnimationFrame(animationFrameId) },
    type: 'destroy',
    listener: () => {}
  });
}

function setupRoom3PatientDListeners() {
  sandboxDialogue.textContent = 'Melatonin analysis confirms a flat, non-existent rhythm, indicating pineal gland compression by the third ventricle mass.';
}

// ==========================================
// ROOM 4 (CEREBELLUM) DIAGNOSTIC LISTENERS
// ==========================================
function setupRoom4PatientAListeners() {
  const shin = document.getElementById('pendular-shin');
  const btn = document.getElementById('btn-tap-knee');
  const hitZone = document.getElementById('tendon-hit-zone');
  
  const runTest = () => {
    shin.style.transform = 'rotate(35deg)';
    sandboxDialogue.textContent = 'Tapping patellar tendon...';
    
    const swings = [35, -22, 15, -10, 6, -3, 1, 0];
    let i = 0;
    
    const doSwing = () => {
      if (i < swings.length) {
        shin.style.transform = `rotate(${swings[i]}deg)`;
        i++;
        setTimeout(doSwing, 250);
      } else {
        sandboxDialogue.textContent = 'The patellar reflex response shows the lower leg swinging back and forth like a pendulum 5-6 times before settling. Differentiate what muscle tone state and localization would cause this oscillatory behavior.';
      }
    };
    
    setTimeout(doSwing, 150);
  };
  
  addSandboxListener(btn, 'click', runTest);
  if (hitZone) {
    addSandboxListener(hitZone, 'click', runTest);
  }
}

function setupRoom4PatientBListeners() {
  const handL = document.getElementById('hand-palm-left');
  const handR = document.getElementById('hand-palm-right');
  const btn = document.getElementById('btn-run-dysdiad');
  
  let flipInterval = null;
  const runTest = () => {
    if (flipInterval) clearInterval(flipInterval);
    
    let ticks = 0;
    sandboxDialogue.textContent = 'Testing rapid alternating pronation/supination of both hands...';
    
    flipInterval = setInterval(() => {
      ticks++;
      const lRot = ticks % 2 === 0 ? 0 : 180;
      handL.style.transform = `rotateY(${lRot}deg)`;
      
      let rRot = 0;
      if (ticks < 4) {
        rRot = ticks % 2 === 0 ? 0 : 180;
      } else if (ticks < 8) {
        rRot = 0;
      } else {
        rRot = ticks % 2 === 0 ? 90 : 0;
      }
      handR.style.transform = `rotateY(${rRot}deg)`;
      
      if (ticks >= 12) {
        clearInterval(flipInterval);
        handL.style.transform = '';
        handR.style.transform = '';
        sandboxDialogue.textContent = 'Samuel\'s left hand performs smooth, rapid alternating movements. His right hand loses rhythm, stalls, and becomes completely disorganized. What cerebellar coordination sign is this?';
      }
    }, 250);
  };
  
  addSandboxListener(btn, 'click', runTest);
}

function setupRoom4PatientCListeners() {
  const grid = document.getElementById('ataxia-footprints');
  const btn = document.getElementById('btn-ataxia-walk');
  
  const runTest = () => {
    grid.innerHTML = '';
    sandboxDialogue.textContent = 'Linda tries to walk in a straight tandem line...';
    
    const steps = [
      { top: 150, left: 110, char: '👣' },
      { top: 115, left: 80, char: '👣' },
      { top: 80, left: 50, char: '👣' },
      { top: 45, left: 20, char: '👣' },
      { top: 10, left: 10, char: '⚠️' }
    ];
    
    steps.forEach((step, index) => {
      setTimeout(() => {
        const div = document.createElement('div');
        div.className = 'ataxia-footprint';
        div.style.top = `${step.top}px`;
        div.style.left = `${step.left}px`;
        div.textContent = step.char;
        grid.appendChild(div);
        
        if (index === steps.length - 1) {
          sandboxDialogue.textContent = 'Linda staggers, spreads her feet with a wide base of support to maintain balance, and veers sharply to her left. Note which coordinate abnormality this represents.';
        }
      }, index * 400);
    });
  };
  
  addSandboxListener(btn, 'click', runTest);
}

function setupRoom4PatientDListeners() {
  const finger = document.getElementById('tremor-finger');
  const target = document.getElementById('tremor-target-target');
  
  playgroundArea.style.cursor = 'none';
  
  const handleMouseMove = (e) => {
    const rect = playgroundArea.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const targetRect = target.getBoundingClientRect();
    const targetX = targetRect.left + targetRect.width / 2 - rect.left;
    const targetY = targetRect.top + targetRect.height / 2 - rect.top;
    
    const dist = Math.hypot(mouseX - targetX, mouseY - targetY);
    
    let shakeAmp = 3;
    if (dist < 200) {
      shakeAmp = 3 + (1 - dist / 200) * 22;
    }
    
    const shakeX = (Math.random() * 2 - 1) * shakeAmp;
    const shakeY = (Math.random() * 2 - 1) * shakeAmp;
    
    finger.style.left = `${mouseX + shakeX}px`;
    finger.style.top = `${mouseY + shakeY}px`;
    
    if (dist < 35) {
      sandboxDialogue.textContent = 'Omar\'s hand is steady at rest, but as his finger reaches the nose, it shakes violently in multiple directions, overshooting and missing the target completely. Identify the cerebellar signs shown by this target-directed instability.';
    } else {
      sandboxDialogue.textContent = 'Omar tracks your finger. His hand is slightly shaky, and the tremor becomes increasingly violent as he approaches the target.';
    }
  };
  
  addSandboxListener(playgroundArea, 'mousemove', handleMouseMove);
}

// ==========================================
// ROOM 5 (NEUROCHEMISTRY) DIAGNOSTIC LISTENERS
// ==========================================
function setupRoom5PatientAListeners() {
  const handSvg = document.getElementById('parkinson-hand-svg');
  const handPath = document.getElementById('parkinson-hand-path');
  const btn = document.getElementById('btn-parkinson-grip');
  
  handSvg.classList.add('trembling');
  
  const handleGripStart = () => {
    handSvg.classList.remove('trembling');
    handPath.style.stroke = 'var(--blue-neon)';
    handPath.style.fill = 'var(--blue-glow)';
    sandboxDialogue.textContent = 'You test Bernard\'s grip. Strength is fully intact (5/5). While clenching, the resting tremor is completely suppressed!';
  };
  
  const handleGripEnd = () => {
    handSvg.classList.add('trembling');
    handPath.style.stroke = 'var(--pink-neon)';
    handPath.style.fill = '#1c1136';
    sandboxDialogue.textContent = 'Bernard: "My hand won\'t stop shaking when I\'m just sitting... but if I reach for a cup, it steadies out a bit."';
  };
  
  addSandboxListener(btn, 'mousedown', handleGripStart);
  addSandboxListener(btn, 'mouseup', handleGripEnd);
  addSandboxListener(btn, 'mouseleave', handleGripEnd);
  
  addSandboxListener(handSvg, 'mousedown', handleGripStart);
  addSandboxListener(handSvg, 'mouseup', handleGripEnd);
  addSandboxListener(handSvg, 'mouseleave', handleGripEnd);
}

function setupRoom5PatientBListeners() {
  const container = document.getElementById('synapse-neurotransmitters');
  const btn = document.getElementById('btn-synapse-count');
  const laser = document.getElementById('synapse-laser');
  
  container.innerHTML = '';
  
  const handleScanClick = () => {
    laser.classList.add('scanning');
    sandboxDialogue.textContent = 'Scanning synaptic density...';
    
    setTimeout(() => {
      laser.classList.remove('scanning');
      container.innerHTML = `
        <circle cx="50" cy="45" r="3" class="synapse-molecule serotonin-low" />
        <circle cx="80" cy="55" r="3" class="synapse-molecule serotonin-low" />
        <circle cx="120" cy="50" r="3" class="synapse-molecule serotonin-low" />
        <circle cx="150" cy="48" r="3" class="synapse-molecule serotonin-low" />
      `;
      sandboxDialogue.textContent = 'Synapse scan: Vesicular transmitter density in the synaptic cleft is depleted to 25% of control baseline. This primary monoamine neurotransmitter depletion in the synaptic cleft of the raphe projections correlates with severe depressive symptoms.';
    }, 1500);
  };
  addSandboxListener(btn, 'click', handleScanClick);
}

function setupRoom5PatientCListeners() {
  const line = document.getElementById('eeg-line-path');
  const btn = document.getElementById('btn-trigger-eeg');
  
  let phase = 0;
  let isSeizure = false;
  let eegInterval = null;
  
  const drawWave = () => {
    let d = 'M 0 60';
    if (!isSeizure) {
      // Draw normal baseline wave
      for (let x = 0; x <= 300; x += 10) {
        const y = 60 + Math.sin((x + phase) * 0.1) * 6 + Math.sin((x + phase) * 0.25) * 3;
        d += ` L ${x} ${y}`;
      }
    } else {
      // Draw 3-Hz spike-and-wave discharges
      for (let x = 0; x <= 300; x += 12) {
        const pos = (x + phase) % 60;
        let y = 60;
        if (pos < 6) {
          y = 15; // Rhythmic Spike
        } else if (pos < 22) {
          y = 95; // Rhythmic Slow Wave
        } else {
          y = 60 + Math.sin(x * 0.2) * 2;
        }
        d += ` L ${x} ${y}`;
      }
    }
    line.setAttribute('d', d);
    phase += 6;
  };
  
  eegInterval = setInterval(drawWave, 50);
  
  const handleEegClick = () => {
    isSeizure = true;
    sandboxDialogue.textContent = 'Jacob stops mid-sentence and stares blankly. Eyelids flutter. EEG shows sudden bursts of synchronous, generalized 3-Hz spike-and-wave discharges, diagnostic of absence seizures. (Caused by calcium channel hyperexcitability in thalamocortical networks due to a lack of primary inhibitory neurotransmission).';
    
    setTimeout(() => {
      isSeizure = false;
      sandboxDialogue.textContent = 'Jacob blinks: "What happened? I was just telling you about my school project..." (He immediately resumes conversation with no post-ictal confusion).';
    }, 4000);
  };
  
  addSandboxListener(btn, 'click', handleEegClick);
  
  activeListeners.push({
    target: { removeEventListener: () => clearInterval(eegInterval) },
    type: 'destroy',
    listener: () => {}
  });
}

function setupRoom5PatientDListeners() {
  const w1 = document.getElementById('word-1');
  const w2 = document.getElementById('word-2');
  const w3 = document.getElementById('word-3');
  const timerBar = document.getElementById('memory-timer-bar');
  const timerProgress = document.getElementById('memory-timer-progress');
  const btnReg = document.getElementById('btn-memory-register');
  const btnRecall = document.getElementById('btn-memory-recall');
  
  w1.style.opacity = '0';
  w2.style.opacity = '0';
  w3.style.opacity = '0';
  timerBar.style.display = 'none';
  
  let registeredTime = null;
  
  const handleRegister = () => {
    w1.style.opacity = '1';
    w2.style.opacity = '1';
    w3.style.opacity = '1';
    timerBar.style.display = 'block';
    timerProgress.style.width = '100%';
    
    setTimeout(() => {
      timerProgress.style.width = '0%';
    }, 50);
    
    registeredTime = Date.now();
    sandboxDialogue.textContent = 'Constance repeats the words: "Apple... Table... Penny. Yes, I\'ve got them!"';
  };
  
  const handleRecall = () => {
    if (!registeredTime) {
      sandboxDialogue.textContent = 'Constance: "You haven\'t given me any words to remember yet, dear."';
      return;
    }
    w1.style.opacity = '0';
    w2.style.opacity = '0';
    w3.style.opacity = '0';
    timerBar.style.display = 'none';
    
    const elapsed = Date.now() - registeredTime;
    if (elapsed < 4000) {
      sandboxDialogue.textContent = 'Constance: "Ah yes, Apple, Table, and... Penny! See, my memory is fine!"';
    } else {
      sandboxDialogue.textContent = 'Constance: "Recall? I don\'t remember any words. Did you ask me to remember something? But my wedding day in 1974... Oh, it was a gorgeous spring day. I wore my mother\'s lace veil, and we danced to our favorite song until midnight. It was absolutely magical!"';
    }
  };
  addSandboxListener(btnReg, 'click', handleRegister);
  addSandboxListener(btnRecall, 'click', handleRecall);
}

// ==========================================
// ROOM 6 (ANGIOGRAPHY) DIAGNOSTIC LISTENERS
// ==========================================
function setupRoom6PatientAListeners() {
  const arm = document.getElementById('mca-right-arm');
  const face = document.getElementById('mca-right-face');
  const leg = document.getElementById('mca-right-leg');
  const btn = document.getElementById('btn-mca-strength');
  
  arm.className = '';
  face.className = '';
  leg.className = '';
  
  const handleAssess = () => {
    face.classList.add('mannequin-weak');
    arm.classList.add('mannequin-weak');
    leg.classList.add('mannequin-normal');
    sandboxDialogue.textContent = 'Vincent struggles to speak: "Arm... weak. Speak... hard. Leg... fine." Motor assessment shows right face and right arm hemiparesis (0/5) with normal leg strength (5/5). This upper-limb-predominant deficit and expressive aphasia localizes to the territory of the main lateral cortical artery supplying the motor strip.';
  };
  addSandboxListener(btn, 'click', handleAssess);
}

function setupRoom6PatientBListeners() {
  const arm = document.getElementById('aca-right-arm');
  const face = document.getElementById('aca-right-face');
  const leg = document.getElementById('aca-right-leg');
  const btn = document.getElementById('btn-aca-strength');
  
  arm.className = '';
  face.className = '';
  leg.className = '';
  
  const handleAssess = () => {
    face.classList.add('mannequin-normal');
    arm.classList.add('mannequin-normal');
    leg.classList.add('mannequin-weak');
    sandboxDialogue.textContent = 'Rhea tries to lift her leg but cannot: "My face and arms work perfectly, but my right leg is completely dead weight." Motor assessment shows right leg weakness (1/5) with normal arm/face strength. This lower-limb-predominant deficit localizes to the territory of the medial cortical artery supplying the sagittal motor strip.';
  };
  addSandboxListener(btn, 'click', handleAssess);
}

function setupRoom6PatientCListeners() {
  const points = document.querySelectorAll('#container-visual-r6c .vf-point-r6');
  points.forEach(p => p.className = 'vf-point-r6 ' + p.className.split(' ')[1]);
  
  points.forEach(point => {
    const handlePointClick = (e) => {
      const p = e.target;
      const isRight = p.classList.contains('right-field');
      
      if (isRight) {
        p.classList.add('not-seen');
        p.classList.remove('seen');
        sandboxDialogue.textContent = 'Gerald: "Nothing on the right side. It\'s just blank. Macular vision is spared, but the right half of my world is dark."';
      } else {
        p.classList.add('seen');
        p.classList.remove('not-seen');
        sandboxDialogue.textContent = 'Gerald: "Yes, I see the light clearly on the left."';
      }
    };
    addSandboxListener(point, 'click', handlePointClick);
  });
}

function setupRoom6PatientDListeners() {
  playgroundArea.style.cursor = 'none';
  const targetDot = document.getElementById('basilar-target');
  targetDot.style.display = 'block';
  
  const eyeL = document.getElementById('locked-eye-left');
  const eyeR = document.getElementById('locked-eye-right');
  const irisL = eyeL.querySelector('.iris');
  const irisR = eyeR.querySelector('.iris');
  const maxRadius = 8;
  
  const handleMouseMove = (e) => {
    const rect = playgroundArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    targetDot.style.left = `${x - 7}px`;
    targetDot.style.top = `${mouseY - 7}px`;
    
    const rectL = eyeL.getBoundingClientRect();
    const centerLY = rectL.top + rectL.height / 2 - rect.top;
    
    const dyL = mouseY - centerLY;
    const distL = Math.abs(dyL) || 1;
    const ty = (dyL / distL) * maxRadius;
    
    irisL.style.transform = `translate(0px, ${ty}px)`;
    irisR.style.transform = `translate(0px, ${ty}px)`;
    
    if (dyL < -30) {
      sandboxDialogue.textContent = 'Miriam tracks your finger looking upward. Vertical gaze is fully spared.';
    } else if (dyL > 30) {
      sandboxDialogue.textContent = 'Miriam tracks your finger looking downward. Vertical eye movement is intact.';
    } else {
      sandboxDialogue.textContent = 'Miriam is awake and looks straight ahead. She cannot move her limbs or look horizontally, but blinks once to indicate understanding. (Locked-in syndrome due to occlusion of the main midline trunk of the posterior circulation).';
    }
  };
  addSandboxListener(playgroundArea, 'mousemove', handleMouseMove);
}

// ==========================================
// KEYPAD SECURITY TERMINAL BYPASS
// ==========================================
function handleKeyPress(num) {
  if (state.gameCompleted) return;
  if (state.pinCode.length >= 4) return;
  
  state.pinCode += num;
  updateKeypadDisplay();
}

function handleClearPIN() {
  if (state.gameCompleted) return;
  state.pinCode = '';
  updateKeypadDisplay();
}

function updateKeypadDisplay() {
  let display = '';
  for (let i = 0; i < 4; i++) {
    if (i < state.pinCode.length) {
      display += state.pinCode[i] + ' ';
    } else {
      display += '_ ';
    }
  }
  pinDisplay.textContent = display.trim();
  
  const attemptsDisplay = document.getElementById('attempts-display');
  if (attemptsDisplay) {
    const remaining = Math.max(0, 3 - state.wrongPinAttempts);
    attemptsDisplay.textContent = `ATTEMPTS REMAINING: ${remaining}/3`;
    if (remaining === 1) {
      attemptsDisplay.style.color = 'var(--pink-neon)';
      attemptsDisplay.style.textShadow = '0 0 10px var(--pink-glow)';
    } else {
      attemptsDisplay.style.color = 'var(--blue-neon)';
      attemptsDisplay.style.textShadow = '0 0 10px var(--blue-glow)';
    }
  }
}

async function handleSubmitPIN() {
  if (state.gameCompleted) return;

  if (state.pinCode.length < 4) {
    alert('Security system requires a complete 4-digit passcode.');
    return;
  }

  const submittedPin = state.pinCode;

  try {
    async function verifyRoomPin(roomNumber, pin) {
      const response = await fetch(`/api/verifyPin?roomNumber=${roomNumber}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });

      if (!response.ok) {
        throw new Error('PIN verification request failed');
      }

      return response.json();
    }

    const result = await verifyRoomPin(state.currentRoom, submittedPin);

    if (result.correct === true) {
      handleRoomSuccess();
    } else {
      state.wrongPinAttempts++;
      if (state.wrongPinAttempts >= 3) {
        handleRoomFailure();
      } else {
        handleEscapeFailure();
      }
    }
  } catch (error) {
    console.error('Unable to verify PIN:', error);
    alert('Security system is unavailable. Please try again.');
  }
}


function handleRoomSuccess() {
  state.roomsSucceeded++;
  state.roomAttemptLog.push({
    room: state.currentRoom,
    solved: true,
    attemptsUsed: state.wrongPinAttempts + 1 // wrongPinAttempts is 0, 1, or 2 before the successful submit
  });
  pinDisplay.textContent = 'GRANTED';
  pinDisplay.style.color = 'var(--green-neon)';
  pinDisplay.style.textShadow = '0 0 15px var(--green-glow)';
  
  doorIndicator.className = 'status-indicator unlocked';
  doorStatusText.textContent = 'UNLOCKED';
  doorStatusText.className = 'glow-text-blue';
  lockIllustration.classList.add('unlocked');
  
  setTimeout(() => {
    if (state.currentRoom < 6) {
      showIntermediateTransitionScreen();
    } else {
      handleEscapeSuccess();
    }
  }, 1200);
}

function showIntermediateTransitionScreen(isSuccess = true) {
  const transitionScreen = document.getElementById('transition-screen');
  const clearedLabel = document.getElementById('transition-room-cleared');
  const nextLabel = document.getElementById('transition-next-room');
  const progressBar = document.getElementById('transition-progress');
  const transitionCard = document.getElementById('transition-card');
  const transitionTitle = document.getElementById('transition-title');
  
  if (isSuccess) {
    if (transitionCard) {
      transitionCard.style.borderColor = 'var(--blue-neon)';
      transitionCard.style.boxShadow = '0 0 35px rgba(0, 240, 255, 0.2)';
    }
    if (transitionTitle) {
      transitionTitle.textContent = 'ACCESS GRANTED';
      transitionTitle.style.color = 'var(--green-neon)';
      transitionTitle.style.textShadow = '0 0 15px var(--green-glow)';
    }
    clearedLabel.textContent = `ROOM ${state.currentRoom} COMPLETED`;
    clearedLabel.className = 'glow-text-blue';
  } else {
    if (transitionCard) {
      transitionCard.style.borderColor = 'var(--pink-neon)';
      transitionCard.style.boxShadow = '0 0 35px rgba(255, 0, 127, 0.2)';
    }
    if (transitionTitle) {
      transitionTitle.textContent = 'ROOM FAILED';
      transitionTitle.style.color = 'var(--pink-neon)';
      transitionTitle.style.textShadow = '0 0 15px var(--pink-glow)';
    }
    clearedLabel.textContent = `ROOM ${state.currentRoom} FAILED`;
    clearedLabel.className = 'glow-text-pink';
  }
  
  const nextRoomNum = state.currentRoom + 1;
  const nextRoomName = roomsData[nextRoomNum - 1].name;
  nextLabel.textContent = `LOADING ROOM ${nextRoomNum}: ${nextRoomName.toUpperCase()}...`;
  
  progressBar.style.transition = 'none';
  progressBar.style.width = '0%';
  
  mainScreen.classList.remove('active');
  transitionScreen.classList.add('active');
  
  setTimeout(() => {
    progressBar.style.transition = 'width 3s linear';
    progressBar.style.width = '100%';
  }, 50);
  
  setTimeout(() => {
    state.currentRoom++;
    renderRoom();
    
    doorIndicator.className = 'status-indicator';
    doorStatusText.textContent = 'LOCKED';
    doorStatusText.className = 'glow-text-pink';
    lockIllustration.className = 'lock-art';
    
    transitionScreen.classList.remove('active');
    mainScreen.classList.add('active');
  }, 3050);
}

function handleEscapeSuccess() {
  state.gameCompleted = true;
  stopTimer();
  
  const timeTaken = TOTAL_TIME_MS - state.timeRemaining;
  
  // --- Calculate room points BEFORE showing escape screen ---
  const roomPoints = state.roomAttemptLog.reduce((sum, entry) => {
    if (!entry.solved) return sum + SCORE_CONFIG.roomPointsFailed;
    return sum + (SCORE_CONFIG.roomPointsByAttempt[entry.attemptsUsed] || 0);
  }, 0);

  const escapeBonus = Math.round(
    SCORE_CONFIG.escapeTimeBonusMax * Math.max(0, state.timeRemaining / TOTAL_TIME_MS)
  );
  
  console.log('Room points calculated:', roomPoints);
  console.log('Room attempt log:', state.roomAttemptLog);
  console.log('Escape bonus calculated:', escapeBonus);
  
  // Save room score to database
  saveRoomScore(roomPoints, escapeBonus);
  
  mainScreen.classList.remove('active');
  escapeScreen.classList.add('active');
  finalTimeDisplay.textContent = formatTime(timeTaken);
  summaryTeamName.textContent = state.teamName;
  
  // Update Succeeded/Failed Room Stats
  document.getElementById('rooms-succeeded-count').textContent = `${state.roomsSucceeded}/6`;
  document.getElementById('rooms-failed-count').textContent = `${state.roomsFailed}/6`;
  
  const summaryTextElement = document.getElementById('escape-summary-text');
  if (summaryTextElement) {
    if (state.roomsFailed === 0) {
      summaryTextElement.innerHTML = `
        Congratulations, <strong class="glow-text-pink">${state.teamName}</strong>!<br>
        You solved all 6 clinical rooms perfectly and escaped the Neuro-Diagnostics Lab!
      `;
    } else {
      summaryTextElement.innerHTML = `
        Congratulations, <strong class="glow-text-pink">${state.teamName}</strong>!<br>
        You completed the escape run. You successfully solved ${state.roomsSucceeded} room(s) and bypassed the rest after too many diagnostic errors.
      `;
    }
  }
  
  createConfettiEffect();
}

// New function to save room score
async function saveRoomScore(roomPoints, escapeBonus) {
  try {
    const totalScore = roomPoints + escapeBonus;
    const response = await fetch('/api/savescore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamName: state.teamName,
        roomPoints: totalScore
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save room score');
    }

    console.log('Room score saved successfully:', totalScore);
  } catch (error) {
    console.error('Error saving room score:', error);
  }
}
function handleEscapeFailure() {
  keypadWrapper.classList.add('shake');
  pinDisplay.textContent = 'DENIED';
  pinDisplay.style.color = 'var(--pink-neon)';
  pinDisplay.style.textShadow = '0 0 15px var(--pink-glow)';
  
  state.pinCode = '';
  
  setTimeout(() => {
    keypadWrapper.classList.remove('shake');
    pinDisplay.style.color = '';
    pinDisplay.style.textShadow = '';
    updateKeypadDisplay();
  }, 1000);
}

function handleEscapeFailureTimeout() {
  state.gameCompleted = true;
  stopTimer();
  
  pinDisplay.textContent = 'LOCKED';
  pinDisplay.style.color = 'var(--pink-neon)';
  pinDisplay.style.textShadow = '0 0 15px var(--pink-glow)';
  
  doorIndicator.className = 'status-indicator';
  doorStatusText.textContent = 'FAILED';
  doorStatusText.className = 'glow-text-pink';
  
  document.querySelector('#loss-screen .glow-text-pink').textContent = 'TIME EXPIRED - LOCKS PERMANENT';
  document.getElementById('loss-summary-text').innerHTML = `
    System lockout initiated for <strong id="loss-team-name" class="glow-text-pink">${state.teamName}</strong>.<br><br>
    You failed to solve the clinical puzzles and escape the laboratory within the 45-minute time limit. The electromagnetic doors have been permanently sealed.
  `;
  
  // Reset time display for timeout (remaining time)
  document.querySelector('#loss-screen .escape-time-label').textContent = 'TIME REMAINING';
  document.querySelector('#loss-screen .escape-time-val').textContent = '00:00.0';
  
  setTimeout(() => {
    mainScreen.classList.remove('active');
    const lossScreen = document.getElementById('loss-screen');
    lossScreen.classList.add('active');
    document.getElementById('loss-team-name').textContent = state.teamName;
  }, 1200);
}

function handleRoomFailure() {
  state.roomsFailed++;
  state.roomAttemptLog.push({
    room: state.currentRoom,
    solved: false,
    attemptsUsed: 3
  });
  keypadWrapper.classList.add('shake');
  pinDisplay.textContent = 'LOCKOUT';
  pinDisplay.style.color = 'var(--pink-neon)';
  pinDisplay.style.textShadow = '0 0 15px var(--pink-glow)';
  
  doorIndicator.className = 'status-indicator';
  doorStatusText.textContent = 'FAILED';
  doorStatusText.className = 'glow-text-pink';
  
  state.pinCode = '';
  
  setTimeout(() => {
    keypadWrapper.classList.remove('shake');
    pinDisplay.style.color = '';
    pinDisplay.style.textShadow = '';
    
    if (state.currentRoom < 6) {
      showIntermediateTransitionScreen(false);
    } else {
      handleEscapeSuccess();
    }
  }, 1200);
}

// Listen for results posted up from the crossword iframe
window.addEventListener('message', (event) => {
  if (!event.data || event.data.type !== 'crossword-finished') return;

  state.crosswordStats = {
    timeSeconds: event.data.timeSeconds,
    wordsSolved: event.data.wordsSolved,
    totalWords: event.data.totalWords,
    completed: event.data.completed,
    rank: event.data.rank
  };
console.log('Crossword stats received:', state.crosswordStats);
  showCombinedSummary();
});

function formatCrosswordTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

async function showCombinedSummary() {
  crosswordScreen.classList.remove('active');
  appHeader.style.display = '';
  combinedSummaryScreen.classList.add('active');

  const timeTaken = TOTAL_TIME_MS - state.timeRemaining;
  const cw = state.crosswordStats;

  console.log('=== COMBINED SUMMARY ===');
  console.log('Crossword stats:', cw);

  // --- Escape Room points (already calculated and saved) ---
  const roomPoints = state.roomAttemptLog.reduce((sum, entry) => {
    if (!entry.solved) return sum + SCORE_CONFIG.roomPointsFailed;
    return sum + (SCORE_CONFIG.roomPointsByAttempt[entry.attemptsUsed] || 0);
  }, 0);
  
  const escapeBonus = Math.round(
    SCORE_CONFIG.escapeTimeBonusMax * Math.max(0, state.timeRemaining / TOTAL_TIME_MS)
  );

  // --- Crossword points ---
  let crosswordPoints = 0;
  if (cw) {
    const completed = cw.completed ?? false;
    const timeSeconds = cw.timeSeconds ?? SCORE_CONFIG.crosswordTimeCapSeconds;
    const wordsSolved = cw.wordsSolved ?? 0;
    const totalWords = cw.totalWords ?? 1;

    if (completed) {
      const crosswordTimeBonus = Math.round(
        SCORE_CONFIG.crosswordTimeBonusMax *
        Math.max(0, (SCORE_CONFIG.crosswordTimeCapSeconds - timeSeconds) / SCORE_CONFIG.crosswordTimeCapSeconds)
      );
      crosswordPoints = Math.max(0, SCORE_CONFIG.crosswordBase + crosswordTimeBonus);
    } else {
      const partialBase = Math.round(SCORE_CONFIG.crosswordBase * (wordsSolved / totalWords));
      crosswordPoints = Math.max(0, partialBase);
    }
  }

  const total = roomPoints + escapeBonus + crosswordPoints;

  console.log('Score breakdown:', { roomPoints, escapeBonus, crosswordPoints, total });


  // Save crossword score to database
  await saveCrosswordScore(crosswordPoints, total);

  // --- Populate UI ---
  document.getElementById('combined-team-name').textContent = state.teamName;
  document.getElementById('combined-total-score').textContent = `${total} / ${SCORE_CONFIG.maxTotal}`;

  document.getElementById('combined-escape-time').textContent = formatTime(timeTaken);
  document.getElementById('combined-rooms').textContent = `${state.roomsSucceeded}/6`;
  document.getElementById('combined-room-points').textContent = roomPoints;

  const breakdown = { 1: 0, 2: 0, 3: 0, failed: 0 };
  state.roomAttemptLog.forEach(entry => {
    if (entry.solved) {
      breakdown[entry.attemptsUsed] = (breakdown[entry.attemptsUsed] || 0) + 1;
    } else {
      breakdown.failed++;
    }
  });
  document.getElementById('combined-attempt-breakdown').textContent =
    `1st try: ${breakdown[1]} · 2nd try: ${breakdown[2]} · 3rd try: ${breakdown[3]} · Failed: ${breakdown.failed}`;

  document.getElementById('combined-escape-bonus').textContent = escapeBonus;
  document.getElementById('combined-crossword-time').textContent = cw ? formatCrosswordTime(cw.timeSeconds ?? 0) : '-';
  document.getElementById('combined-crossword-rank').textContent = cw ? (cw.rank ?? 'Incomplete') : '-';
  document.getElementById('combined-crossword-points').textContent = crosswordPoints;

  crosswordFrame.src = 'about:blank';
}

// New function to save crossword score
async function saveCrosswordScore(crosswordPoints, total) {
  try {
   async function saveRoomScore(teamName, points) {
  const response = await fetch('/api/savescore', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      teamName: teamName, 
      roomPoints: points 
    })
  });
  return response.json();
}
    
    if (!response.ok) {
      throw new Error('Failed to save crossword score');
    }
    
    console.log('Crossword score saved successfully:', crosswordPoints);
  } catch (error) {
    console.error('Error saving crossword score:', error);
  }
}
// CROSSWORD FLOW
function handleStartCrossword(fromScreenId) {
  document.getElementById(fromScreenId).classList.remove('active');
  crosswordScreen.classList.add('active');
  appHeader.style.display = 'none';

  // Force a fresh load each time so the puzzle/timer always starts clean
  crosswordFrame.src = 'crossword/index.html?session=' + Date.now();
}

// CONFETTI EFFECT
function createConfettiEffect() {
  const container = document.getElementById('escape-screen');
  const colors = ['#a020f0', '#ff007f', '#00f0ff', '#39ff14', '#ffff00'];
  
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `-${Math.random() * 20}px`;
    p.style.width = `${Math.random() * 10 + 5}px`;
    p.style.height = p.style.width;
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.opacity = Math.random() * 0.7 + 0.3;
    p.style.animationDuration = `${Math.random() * 2 + 2}s`;
    p.style.animationDelay = `${Math.random() * 1.5}s`;
    
    container.appendChild(p);
    setTimeout(() => p.remove(), 4000);
  }
}

// START APP
window.addEventListener('DOMContentLoaded', init);
