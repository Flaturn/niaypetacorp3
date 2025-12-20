import React, { useState, useEffect } from 'react';
import { User, Lock, LogOut, Camera, Crown, Sword, Heart, Moon, Sun } from 'lucide-react';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [tempLevel, setTempLevel] = useState('');
  const [showClassModal, setShowClassModal] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [showImageUrlModal, setShowImageUrlModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [classSearch, setClassSearch] = useState('');
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [showHPModal, setShowHPModal] = useState(false);
  const [hpValue, setHpValue] = useState('');
  const [hoveredAttribute, setHoveredAttribute] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showAddPokemonModal, setShowAddPokemonModal] = useState(false);
  const [showXPModal, setShowXPModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [xpToAdd, setXpToAdd] = useState('');
  const [currentArea, setCurrentArea] = useState('Treinador');
  
  const [pokemonForm, setPokemonForm] = useState({
    name: '',
    species: '',
    captured: true,
    exotic: false,
    level: 1,
    exoticName: '',
    currentXP: 0
  });

  const defaultTrainer = {
    type: 'treinador', image: '', level: 1, mainTeam: 0, pcPokemon: 0, pokedexCount: 0,
    classes: ['', '', '', ''],
    attributes: { saude: 10, ataque: 10, defesa: 10, ataqueEspecial: 10, defesaEspecial: 10, velocidade: 10 },
    skills: { saude: [], ataque: [], defesa: [], ataqueEspecial: [], defesaEspecial: [], velocidade: [] },
    currentHP: 44, maxHP: 44,
    team: [null, null, null, null, null, null],
    pc: [],
    pokedex: []
  };

  const [usersData, setUsersData] = useState({
    Mestre: { type: 'mestre' },
    Alocin: JSON.parse(JSON.stringify(defaultTrainer)),
    Lila: JSON.parse(JSON.stringify(defaultTrainer)),
    Ludovic: JSON.parse(JSON.stringify(defaultTrainer)),
    Noryat: JSON.parse(JSON.stringify(defaultTrainer)),
    Pedro: JSON.parse(JSON.stringify(defaultTrainer))
  });

  const users = [
    { username: 'Mestre', type: 'mestre' },
    { username: 'Alocin', type: 'treinador' },
    { username: 'Lila', type: 'treinador' },
    { username: 'Ludovic', type: 'treinador' },
    { username: 'Noryat', type: 'treinador' },
    { username: 'Pedro', type: 'treinador' }
  ];

  const correctPassword = 'DnD7MarPkm';
  const mestreAreas = ['Treinador NPC', 'Pokémon NPC', 'Enciclopédia M', 'Treinadores'];
  const treinadorAreas = ['Treinador', 'PC', 'Pokédex', 'Mochila', 'Características & Talentos', 'Pokéloja', 'Enciclopédia'];

  const attributeModifiers = {
    1: -9, 2: -8, 3: -7, 4: -6, 5: -5, 6: -4, 7: -3, 8: -2, 9: -1, 10: 0,
    11: 0, 12: 1, 13: 1, 14: 2, 15: 2, 16: 3, 17: 3, 18: 4, 19: 4, 20: 5,
    21: 5, 22: 6, 23: 6, 24: 7, 25: 7, 26: 8, 27: 8, 28: 9, 29: 9, 30: 10,
    31: 10, 32: 11, 33: 11, 34: 12, 35: 12, 36: 13, 37: 13, 38: 14, 39: 14, 40: 15
  };

  const skillsByAttribute = {
    saude: ['Apneia', 'Imunidade', 'Jejum', 'Resiliência'],
    ataque: ['Corrida', 'Força', 'Intimidação', 'Salto'],
    defesa: ['Concentração', 'Deflexão', 'Incansável', 'Regeneração'],
    ataqueEspecial: ['Engenharia', 'História', 'Investigação', 'Programação'],
    defesaEspecial: ['Empatia', 'Manha', 'Manipulação', 'Percepção'],
    velocidade: ['Acrobacia', 'Furtividade', 'Performance', 'Prestidigitação']
  };

  const attributeNames = {
    saude: 'Saúde', ataque: 'Ataque', defesa: 'Defesa',
    ataqueEspecial: 'Ataque Especial', defesaEspecial: 'Defesa Especial', velocidade: 'Velocidade'
  };

  const levelXPTable = {
    1:0,2:25,3:50,4:100,5:150,6:200,7:400,8:600,9:800,10:1000,11:1500,12:2000,13:3000,14:4000,15:5000,
    16:6000,17:7000,18:8000,19:9000,20:10000,21:11500,22:13000,23:14500,24:16000,25:17500,26:19000,
    27:20500,28:22000,29:23500,30:25000,31:27500,32:30000,33:32500,34:35000,35:37500,36:40000,37:42500,
    38:45000,39:47500,40:50000,41:55000,42:60000,43:65000,44:70000,45:75000,46:80000,47:85000,48:90000,
    49:95000,50:100000,51:110000,52:120000,53:130000,54:140000,55:150000,56:160000,57:170000,58:180000,
    59:190000,60:200000,61:210000,62:220000,63:230000,64:240000,65:250000,66:260000,67:270000,68:280000,
    69:290000,70:300000,71:310000,72:320000,73:330000,74:340000,75:350000,76:360000,77:370000,78:380000,
    79:390000,80:400000,81:410000,82:420000,83:430000,84:440000,85:450000,86:460000,87:470000,88:480000,
    89:490000,90:500000,91:510000,92:520000,93:530000,94:540000,95:550000,96:560000,97:570000,98:580000,
    99:590000,100:600000
  };

  const pokemonSpecies = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Pikachu', 'Raichu', 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon'];
  
  const pokeballs = ['Pokébola', 'Grande Bola', 'Ultra Bola', 'Master Ball', 'Safari Ball', 'Rapid Ball', 'Level Ball', 'Heavy Ball'];

  const classes = [
    { name: 'Artista', isClass: true, color: 'bg-blue-300' },
    { name: 'Beldade', isClass: false, color: 'bg-blue-300' },
    { name: 'Cativante', isClass: false, color: 'bg-blue-300' },
    { name: 'Coreógrafo', isClass: false, color: 'bg-blue-300' },
    { name: 'Descolado', isClass: false, color: 'bg-blue-300' },
    { name: 'Estilista', isClass: false, color: 'bg-blue-300' },
    { name: 'Nerd', isClass: false, color: 'bg-blue-300' },
    { name: 'Parrudo', isClass: false, color: 'bg-blue-300' },
    { name: 'Captor', isClass: true, color: 'bg-orange-400' },
    { name: 'Artífice', isClass: false, color: 'bg-orange-400' },
    { name: 'Colecionador', isClass: false, color: 'bg-orange-400' },
    { name: 'Domador', isClass: false, color: 'bg-orange-400' },
    { name: 'Engenheiro', isClass: false, color: 'bg-orange-400' },
    { name: 'Ladrão', isClass: false, color: 'bg-orange-400' },
    { name: 'Malabarista', isClass: false, color: 'bg-orange-400' },
    { name: 'Pokébolista', isClass: false, color: 'bg-orange-400' },
    { name: 'Criador', isClass: true, color: 'bg-pink-400' },
    { name: 'Botânico', isClass: false, color: 'bg-pink-400' },
    { name: 'Cozinheiro', isClass: false, color: 'bg-pink-400' },
    { name: 'Cuidador', isClass: false, color: 'bg-pink-400' },
    { name: 'Evolucionista', isClass: false, color: 'bg-pink-400' },
    { name: 'Incubador', isClass: false, color: 'bg-pink-400' },
    { name: 'Médico', isClass: false, color: 'bg-pink-400' },
    { name: 'Tutor', isClass: false, color: 'bg-pink-400' },
    { name: 'Guerreiro', isClass: true, color: 'bg-yellow-600' },
    { name: 'Artista Marcial', isClass: false, color: 'bg-yellow-600' },
    { name: 'Atleta', isClass: false, color: 'bg-yellow-600' },
    { name: 'Áugure', isClass: false, color: 'bg-yellow-600' },
    { name: 'Bandido', isClass: false, color: 'bg-yellow-600' },
    { name: 'Monge', isClass: false, color: 'bg-yellow-600' },
    { name: 'Ninja', isClass: false, color: 'bg-yellow-600' },
    { name: 'Soldado', isClass: false, color: 'bg-yellow-600' },
    { name: 'Místico', isClass: true, color: 'bg-purple-500' },
    { name: 'Bardo', isClass: false, color: 'bg-purple-500' },
    { name: 'Guardião', isClass: false, color: 'bg-purple-500' },
    { name: 'Ilusionista', isClass: false, color: 'bg-purple-500' },
    { name: 'Médium', isClass: false, color: 'bg-purple-500' },
    { name: 'Orador', isClass: false, color: 'bg-purple-500' },
    { name: 'Rúnico', isClass: false, color: 'bg-purple-500' },
    { name: 'Xamã', isClass: false, color: 'bg-purple-500' },
    { name: 'Pesquisador', isClass: true, color: 'bg-blue-800' },
    { name: 'Cientista', isClass: false, color: 'bg-blue-800' },
    { name: 'Fotógrafo', isClass: false, color: 'bg-blue-800' },
    { name: 'Hipnólogo', isClass: false, color: 'bg-blue-800' },
    { name: 'Observador', isClass: false, color: 'bg-blue-800' },
    { name: 'Ocultista', isClass: false, color: 'bg-blue-800' },
    { name: 'Petrologista', isClass: false, color: 'bg-blue-800' },
    { name: 'Professor', isClass: false, color: 'bg-blue-800' },
    { name: 'Psíquico', isClass: true, color: 'bg-amber-700' },
    { name: 'Ardente', isClass: false, color: 'bg-amber-700' },
    { name: 'Bruxo', isClass: false, color: 'bg-amber-700' },
    { name: 'Célio', isClass: false, color: 'bg-amber-700' },
    { name: 'Empático', isClass: false, color: 'bg-amber-700' },
    { name: 'Nebuloso', isClass: false, color: 'bg-amber-700' },
    { name: 'Terrulento', isClass: false, color: 'bg-amber-700' },
    { name: 'Vidente', isClass: false, color: 'bg-amber-700' },
    { name: 'Ranger', isClass: true, color: 'bg-green-600' },
    { name: 'Aventureiro', isClass: false, color: 'bg-green-600' },
    { name: 'Cavaleiro', isClass: false, color: 'bg-green-600' },
    { name: 'Detetive', isClass: false, color: 'bg-green-600' },
    { name: 'Guia', isClass: false, color: 'bg-green-600' },
    { name: 'Oficial', isClass: false, color: 'bg-green-600' },
    { name: 'Pactuário', isClass: false, color: 'bg-green-600' },
    { name: 'Policial', isClass: false, color: 'bg-green-600' },
    { name: 'Treinador', isClass: true, color: 'bg-red-600' },
    { name: 'Azarão', isClass: false, color: 'bg-red-600' },
    { name: 'Caçador', isClass: false, color: 'bg-red-600' },
    { name: 'Elementalista', isClass: false, color: 'bg-red-600' },
    { name: 'Especialista', isClass: false, color: 'bg-red-600' },
    { name: 'Estrategista', isClass: false, color: 'bg-red-600' },
    { name: 'Inquebrável', isClass: false, color: 'bg-red-600' },
    { name: 'Síncrono', isClass: false, color: 'bg-red-600' }
  ];

  const getUserButtonStyle = (username) => {
    const base = "p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2 ";
    const isSelected = selectedUsername === username;
    const styles = {
      'Mestre': 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white',
      'Alocin': 'bg-gradient-to-r from-blue-900 to-black text-white',
      'Noryat': 'bg-gradient-to-r from-black via-black to-white text-white',
      'Lila': 'bg-gradient-to-r from-purple-600 to-red-600 text-white',
      'Pedro': 'bg-gradient-to-r from-blue-600 to-green-600 text-white',
      'Ludovic': 'bg-gradient-to-r from-red-600 to-black text-white'
    };
    return base + styles[username] + ' ' + (isSelected ? 'border-blue-500' : 'hover:border-gray-400');
  };

  const updateUser = (username, updates) => {
    setUsersData(prev => ({ ...prev, [username]: { ...prev[username], ...updates } }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!selectedUsername) {
      setError('Por favor, selecione um usuário');
      return;
    }
    if (password === correctPassword) {
      setCurrentUser({ username: selectedUsername, ...usersData[selectedUsername] });
      setError('');
      setPassword('');
    } else {
      setError('Senha incorreta');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedUsername('');
    setPassword('');
    setError('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser(currentUser.username, { image: reader.result });
        setCurrentUser(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmImageUrl = () => {
    if (imageUrl) {
      updateUser(currentUser.username, { image: imageUrl });
      setCurrentUser(prev => ({ ...prev, image: imageUrl }));
      setImageUrl('');
      setShowImageUrlModal(false);
    }
  };

  const handleLevelChange = () => {
    const level = parseInt(tempLevel);
    if (level >= 0 && level <= 50) {
      const newMaxHP = (level + currentUser.attributes.saude) * 4;
      updateUser(currentUser.username, { level, maxHP: newMaxHP, currentHP: newMaxHP });
      setCurrentUser(prev => ({ ...prev, level, maxHP: newMaxHP, currentHP: newMaxHP }));
      setShowLevelModal(false);
      setTempLevel('');
    }
  };

  const incrementLevel = () => {
    if (currentUser.level < 50) {
      const newLevel = currentUser.level + 1;
      const newMaxHP = (newLevel + currentUser.attributes.saude) * 4;
      updateUser(currentUser.username, { level: newLevel, maxHP: newMaxHP, currentHP: newMaxHP });
      setCurrentUser(prev => ({ ...prev, level: newLevel, maxHP: newMaxHP, currentHP: newMaxHP }));
    }
  };

  const decrementLevel = () => {
    if (currentUser.level > 0) {
      const newLevel = currentUser.level - 1;
      const newMaxHP = (newLevel + currentUser.attributes.saude) * 4;
      updateUser(currentUser.username, { level: newLevel, maxHP: newMaxHP, currentHP: newMaxHP });
      setCurrentUser(prev => ({ ...prev, level: newLevel, maxHP: newMaxHP, currentHP: newMaxHP }));
    }
  };

  const handleClassSelect = (className) => {
    const newClasses = [...currentUser.classes];
    newClasses[currentSlot] = className;
    updateUser(currentUser.username, { classes: newClasses });
    setCurrentUser(prev => ({ ...prev, classes: newClasses }));
    setShowClassModal(false);
    setCurrentSlot(null);
    setClassSearch('');
  };

  const filteredClasses = classes.filter(item => item.name.toLowerCase().includes(classSearch.toLowerCase()));

  const handleAttributeChange = (attr, value) => {
    const num = parseInt(value) || 0;
    if (num >= 1 && num <= 40) {
      const newAttr = { ...currentUser.attributes, [attr]: num };
      let newMaxHP = currentUser.maxHP;
      let newCurHP = currentUser.currentHP;
      if (attr === 'saude') {
        newMaxHP = (currentUser.level + num) * 4;
        newCurHP = newMaxHP;
      }
      updateUser(currentUser.username, { attributes: newAttr, maxHP: newMaxHP, currentHP: newCurHP });
      setCurrentUser(prev => ({ ...prev, attributes: newAttr, maxHP: newMaxHP, currentHP: newCurHP }));
    }
  };

  const getModifier = (value) => attributeModifiers[value] || 0;

  const toggleSkill = (attribute, skill) => {
    const curr = currentUser.skills[attribute];
    const count = curr.filter(s => s === skill).length;
    let newSkills = count === 0 ? [...curr, skill] : count === 1 ? [...curr, skill] : curr.filter(s => s !== skill);
    const updSkills = { ...currentUser.skills, [attribute]: newSkills };
    updateUser(currentUser.username, { skills: updSkills });
    setCurrentUser(prev => ({ ...prev, skills: updSkills }));
  };

  const getSkillCount = (attr, skill) => currentUser.skills[attr].filter(s => s === skill).length;

  const handleHeal = () => {
    const val = parseInt(hpValue) || 0;
    if (val > 0) {
      const newHP = Math.min(currentUser.currentHP + val, currentUser.maxHP);
      updateUser(currentUser.username, { currentHP: newHP });
      setCurrentUser(prev => ({ ...prev, currentHP: newHP }));
      setHpValue('');
      setShowHPModal(false);
    }
  };

  const handleDamage = () => {
    const val = parseInt(hpValue) || 0;
    if (val > 0) {
      const newHP = currentUser.currentHP - val;
      updateUser(currentUser.username, { currentHP: newHP });
      setCurrentUser(prev => ({ ...prev, currentHP: newHP }));
      setHpValue('');
      setShowHPModal(false);
    }
  };

  const getHPBarWidth = () => Math.max(0, Math.min(100, (currentUser.currentHP / currentUser.maxHP) * 100));

  const calculateLevel = (xp) => {
    let level = 1;
    let remainingXP = xp;
    
    for (let i = 2; i <= 100; i++) {
      if (remainingXP >= levelXPTable[i]) {
        remainingXP -= levelXPTable[i];
        level = i;
      } else {
        break;
      }
    }
    
    return { level, currentXP: remainingXP };
  };

  const addPokemon = () => {
    if (!pokemonForm.captured && !pokemonForm.name) {
      pokemonForm.name = pokemonForm.exotic ? pokemonForm.exoticName : pokemonForm.species;
    }
    
    if (!pokemonForm.species && !pokemonForm.exotic) {
      alert('Selecione uma espécie');
      return;
    }
    
    const newPokemon = {
      id: Date.now(),
      name: pokemonForm.name,
      species: pokemonForm.exotic ? pokemonForm.exoticName : pokemonForm.species,
      captured: pokemonForm.captured,
      level: pokemonForm.captured ? pokemonForm.level : 1,
      currentXP: 0
    };
    
    let updates = {};
    let newPokedex = [...currentUser.pokedex];
    
    // Adiciona na Pokédex
    if (!newPokedex.find(p => p.species === newPokemon.species)) {
      newPokedex.push({ species: newPokemon.species, captured: pokemonForm.captured });
      updates.pokedex = newPokedex;
      updates.pokedexCount = newPokedex.length;
    }
    
    // Se capturado, adiciona no time ou PC
    if (pokemonForm.captured) {
      const teamCopy = [...currentUser.team];
      const emptySlot = teamCopy.findIndex(slot => slot === null);
      
      if (emptySlot !== -1) {
        teamCopy[emptySlot] = newPokemon;
        updates.team = teamCopy;
        updates.mainTeam = teamCopy.filter(p => p !== null).length;
      } else {
        const pcCopy = [...currentUser.pc, newPokemon];
        updates.pc = pcCopy;
        updates.pcPokemon = pcCopy.length;
      }
      
      // Verifica level up do treinador (a cada 10 capturados)
      const totalCaptured = newPokedex.filter(p => p.captured).length;
      if (totalCaptured % 10 === 0 && totalCaptured > 0) {
        const newLevel = currentUser.level + 1;
        const newMaxHP = (newLevel + currentUser.attributes.saude) * 4;
        updates.level = newLevel;
        updates.maxHP = newMaxHP;
        updates.currentHP = newMaxHP;
      }
    } else {
      // Verifica level up do treinador (a cada 40 escaneados)
      const totalScanned = newPokedex.filter(p => !p.captured).length;
      if (totalScanned % 40 === 0 && totalScanned > 0) {
        const newLevel = currentUser.level + 1;
        const newMaxHP = (newLevel + currentUser.attributes.saude) * 4;
        updates.level = newLevel;
        updates.maxHP = newMaxHP;
        updates.currentHP = newMaxHP;
      }
    }
    
    updateUser(currentUser.username, updates);
    setCurrentUser(prev => ({ ...prev, ...updates }));
    
    setPokemonForm({
      name: '', species: '', captured: true, exotic: false,
      level: 1, exoticName: '', currentXP: 0
    });
    setShowAddPokemonModal(false);
  };

  const addXPToPokemon = () => {
    const xp = parseInt(xpToAdd) || 0;
    if (xp <= 0) return;
    
    const totalXP = selectedPokemon.currentXP + xp;
    const { level, currentXP } = calculateLevel(totalXP);
    
    const updatedPokemon = { ...selectedPokemon, level, currentXP };
    
    const teamCopy = [...currentUser.team];
    const teamIndex = teamCopy.findIndex(p => p && p.id === selectedPokemon.id);
    
    if (teamIndex !== -1) {
      teamCopy[teamIndex] = updatedPokemon;
      updateUser(currentUser.username, { team: teamCopy });
      setCurrentUser(prev => ({ ...prev, team: teamCopy }));
    }
    
    setXpToAdd('');
    setShowXPModal(false);
    setSelectedPokemon(null);
  };

  const closeModal = () => {
    setShowLevelModal(false);
    setShowClassModal(false);
    setShowSkillsModal(false);
    setShowHPModal(false);
    setShowImageUrlModal(false);
    setTempLevel('');
    setHpValue('');
    setImageUrl('');
    setClassSearch('');
    setCurrentSlot(null);
  };

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  if (!currentUser) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-900 via-purple-900 to-red-900'} flex items-center justify-center p-4`}>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl p-8 w-full max-w-md`}>
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>Niaypeta Corp™</h1>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>O Professor Carvalho quer saber seu nome.</p>
          </div>
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Selecione o Usuário</label>
              <div className="grid grid-cols-2 gap-3">
                {users.map((user, i) => (
                  <button key={i} type="button" onClick={() => setSelectedUsername(user.username)} className={getUserButtonStyle(user.username)}>
                    <User size={18} />
                    <span className="font-medium">{user.username}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Senha</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)} className={`w-full pl-10 pr-4 py-3 border-2 ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:border-blue-500 focus:outline-none`} placeholder="Digite a senha" />
              </div>
            </div>
            {error && <div className={`${darkMode ? 'bg-red-900 border-red-700 text-red-200' : 'bg-red-50 border-red-200 text-red-700'} border px-4 py-3 rounded-lg`}>{error}</div>}
            <button onClick={handleLogin} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg">Entrar</button>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`mt-4 w-full flex items-center justify-center gap-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} py-2 rounded-lg transition-colors`}
          >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
            <span className={darkMode ? 'text-white' : 'text-gray-700'}>{darkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
          </button>
        </div>
      </div>
    );
  }

  const areas = currentUser.type === 'mestre' ? mestreAreas : treinadorAreas;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-900 via-purple-900 to-red-900'}`}>
      <div className={darkMode ? 'bg-gray-800 shadow-lg' : 'bg-white shadow-lg'}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{currentUser.username}</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}><span className="capitalize">{currentUser.type}</span></p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`flex items-center gap-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-4 py-2 rounded-lg transition-colors text-sm`}
              >
                {darkMode ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} />}
              </button>
              <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                <LogOut size={16} />
                Sair
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {areas.map((area, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentArea(area)}
                className={`${currentArea === area ? 'bg-gradient-to-br from-blue-600 to-purple-700' : 'bg-gradient-to-br from-blue-500 to-purple-600'} text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow hover:shadow-md text-sm font-medium`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>

      {currentUser.type === 'treinador' && currentArea === 'Treinador' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 mt-6`}>
            <div className="flex items-start gap-6 mb-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {currentUser.image ? <img src={currentUser.image} alt="Treinador" className="w-full h-full object-cover" /> : <User size={48} className="text-gray-400" />}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowImageUrlModal(true)} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
                    <Camera size={20} />
                  </button>
                  <label className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors cursor-pointer">
                    <Camera size={20} />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{currentUser.username}</h2>
                  <button onClick={() => setShowLevelModal(true)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 font-semibold text-sm">Lvl</button>
                  <button onClick={() => setShowSkillsModal(true)} className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 font-semibold text-sm">Perícias</button>
                  <button onClick={() => setShowHPModal(true)} className="bg-gradient-to-r from-red-500 to-green-500 text-white px-3 py-1 rounded-lg hover:from-red-600 hover:to-green-600 font-semibold text-sm flex items-center gap-1">
                    <Sword size={16} />
                    <Heart size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Nível: {currentUser.level}</span>
                  <button onClick={decrementLevel} className="bg-red-500 text-white w-8 h-8 rounded hover:bg-red-600 font-bold">-</button>
                  <button onClick={incrementLevel} className="bg-green-500 text-white w-8 h-8 rounded hover:bg-green-600 font-bold">+</button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Vida: {currentUser.currentHP}/{currentUser.maxHP}</span>
                  </div>
                  <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full h-6 overflow-hidden relative`}>
                    <div className="bg-green-500 h-full transition-all duration-300 flex items-center justify-center" style={{ width: `${getHPBarWidth()}%` }}>
                      <span className="text-white font-bold text-sm z-10">{Math.round(getHPBarWidth())}%</span>
                    </div>
                  </div>
                </div>

                </div>

                <div className="flex gap-4 mb-8">
                  <div className={`${darkMode ? 'bg-blue-900' : 'bg-blue-100'} px-4 py-2 rounded-lg`}>
                    <span className={`font-semibold ${darkMode ? 'text-blue-200' : 'text-gray-700'}`}>Time Principal: {currentUser.mainTeam}/6</span>
                  </div>
                  <div className={`${darkMode ? 'bg-green-900' : 'bg-green-100'} px-4 py-2 rounded-lg`}>
                    <span className={`font-semibold ${darkMode ? 'text-green-200' : 'text-gray-700'}`}>PC: {currentUser.pcPokemon}/1000</span>
                  </div>
                  <div className={`${darkMode ? 'bg-purple-900' : 'bg-purple-100'} px-4 py-2 rounded-lg`}>
                    <span className={`font-semibold ${darkMode ? 'text-purple-200' : 'text-gray-700'}`}>Pokédex: {currentUser.pokedexCount}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Classes & Subclasses</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {currentUser.classes.map((cls, i) => (
                      <button key={i} onClick={() => { setCurrentSlot(i); setShowClassModal(true); }} className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border-2 px-4 py-3 rounded-lg hover:border-blue-500 text-left`}>
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{cls || 'Classe&Subclasse'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Atributos</h3>
                  <div className="overflow-x-auto">
                    <table className={`w-full border-collapse border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                      <thead>
                        <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                          <th className={`border ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300'} px-4 py-2 text-left`}>Atributo</th>
                          <th className={`border ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300'} px-4 py-2 text-center`}>Valor</th>
                          <th className={`border ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300'} px-4 py-2 text-center`}>Modificador</th>
                          <th className={`border ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300'} px-4 py-2 text-left`}>Perícias</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(currentUser.attributes).map((attr) => {
                          const showBelow = attr === 'saude' || attr === 'ataque';
                          return (
                            <tr key={attr} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                              <td 
                                className={`border ${darkMode ? 'border-gray-600' : 'border-gray-300'} px-4 py-2 font-semibold cursor-help relative ${darkMode ? 'text-gray-300' : ''}`}
                                onMouseEnter={() => setHoveredAttribute(attr)}
                                onMouseLeave={() => setHoveredAttribute(null)}
                              >
                                {attributeNames[attr]}
                                {hoveredAttribute === attr && (
                                  <div className={`absolute ${showBelow ? 'top-full mt-2' : 'bottom-full mb-2'} left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl z-50 whitespace-nowrap`}>
                                    <div className="font-bold mb-2 text-center">Perícias de {attributeNames[attr]}:</div>
                                    <div className="space-y-1">
                                      {skillsByAttribute[attr].map((skill, idx) => (
                                        <div key={idx} className="text-sm">• {skill}</div>
                                      ))}
                                    </div>
                                    <div className={`absolute ${showBelow ? 'bottom-full' : 'top-full'} left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 ${showBelow ? 'border-b-8 border-b-gray-900' : 'border-t-8 border-t-gray-900'} border-transparent`}></div>
                                  </div>
                                )}
                              </td>
                              <td className={`border ${darkMode ? 'border-gray-600' : 'border-gray-300'} px-4 py-2 text-center`}>
                                <input type="number" min="1" max="40" value={currentUser.attributes[attr]} onChange={(e) => handleAttributeChange(attr, e.target.value)} className={`w-20 px-2 py-1 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded text-center focus:border-blue-500 focus:outline-none`} />
                              </td>
                              <td className={`border ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300'} px-4 py-2 text-center font-semibold`}>
                                {getModifier(currentUser.attributes[attr]) >= 0 ? '+' : ''}{getModifier(currentUser.attributes[attr])}
                              </td>
                              <td className={`border ${darkMode ? 'border-gray-600' : 'border-gray-300'} px-4 py-2`}>
                                <div className="flex flex-wrap gap-1">
                                  {currentUser.skills[attr].reduce((acc, skill) => {
                                    if (!acc.find(s => s.name === skill)) {
                                      const count = getSkillCount(attr, skill);
                                      acc.push({ name: skill, count });
                                    }
                                    return acc;
                                  }, []).map((skillData, idx) => (
                                    <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                      {skillData.name}{skillData.count === 2 ? ' x2' : ''}
                                    </span>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Deslocamentos</h3>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 space-y-3`}>
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Terrestre:</span>
                        <span className="text-xl font-bold text-blue-600">
                          {(() => {
                            const modAtaque = getModifier(currentUser.attributes.ataque);
                            const modVelocidade = getModifier(currentUser.attributes.velocidade);
                            const maior = Math.max(modAtaque, modVelocidade);
                            const calc = 3 + Math.floor(maior / 2);
                            return Math.max(calc, 5);
                          })()}m
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Natação:</span>
                        <span className="text-xl font-bold text-cyan-600">
                          {(() => {
                            const modDefesa = getModifier(currentUser.attributes.defesa);
                            const calc = 2 + Math.floor(modDefesa / 2);
                            return Math.max(calc, 4);
                          })()}m
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subaquático:</span>
                        <span className="text-xl font-bold text-indigo-600">
                          {(() => {
                            const modAtaque = getModifier(currentUser.attributes.ataque);
                            const modDefesa = getModifier(currentUser.attributes.defesa);
                            return (modAtaque >= 3 || modDefesa >= 3) ? 4 : 3;
                          })()}m
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Evasão</h3>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 space-y-3`}>
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Física:</span>
                        <span className="text-xl font-bold text-red-600">
                          {Math.floor(currentUser.attributes.defesa / 5)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Especial:</span>
                        <span className="text-xl font-bold text-purple-600">
                          {Math.floor(currentUser.attributes.defesaEspecial / 5)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Veloz:</span>
                        <span className="text-xl font-bold text-green-600">
                          {Math.floor(currentUser.attributes.velocidade / 5)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time Principal ({currentUser.mainTeam}/6)</h3>
                    <button
                      onClick={() => setShowAddPokemonModal(true)}
                      className="flex items-center gap-2 bg-white border-4 border-black text-gray-800 px-4 py-2 rounded-full hover:scale-105 transition-transform font-semibold shadow-lg"
                      style={{
                        background: 'linear-gradient(180deg, #FF0000 0%, #FF0000 50%, #FFFFFF 50%, #FFFFFF 100%)',
                        borderColor: '#000'
                      }}
                    >
                      <div 
                        className="w-6 h-6 rounded-full border-4 border-black"
                        style={{
                          background: 'linear-gradient(180deg, #FF0000 0%, #FF0000 50%, #FFFFFF 50%, #FFFFFF 100%)'
                        }}
                      ></div>
                      <span className="text-white font-bold" style={{textShadow: '1px 1px 2px black'}}>Adicionar Pkm</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {currentUser.team.map((pokemon, index) => (
                      <div
                        key={index}
                        className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border-2 rounded-lg p-4`}
                      >
                        {pokemon ? (
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{pokemon.name || pokemon.species}</span>
                                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Espécie: {pokemon.species}</span>
                                <span className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Nv. {pokemon.level}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  XP: {pokemon.currentXP}/{levelXPTable[pokemon.level + 1] || 'MAX'}
                                </span>
                                <div className="flex-1 bg-gray-300 rounded-full h-3 overflow-hidden max-w-xs">
                                  <div 
                                    className="bg-blue-500 h-full transition-all duration-300"
                                    style={{ 
                                      width: `${levelXPTable[pokemon.level + 1] ? (pokemon.currentXP / levelXPTable[pokemon.level + 1]) * 100 : 100}%` 
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedPokemon(pokemon);
                                setShowXPModal(true);
                              }}
                              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 font-semibold"
                            >
                              +XP
                            </button>
                          </div>
                        ) : (
                          <div className={`flex items-center justify-center py-8 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            Slot Vazio
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

            </div>
          </div>
        </div>
      )}

      {currentUser.type === 'treinador' && currentArea === 'PC' && (
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mt-4`}>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>PC ({currentUser.pcPokemon}/1000)</h2>
            <div className="space-y-3">
              {currentUser.pc.map((pokemon, index) => (
                <div key={index} className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border-2 rounded-lg p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{pokemon.name || pokemon.species}</span>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Espécie: {pokemon.species}</span>
                        <span className={`text-sm font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Nv. {pokemon.level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          XP: {pokemon.currentXP}/{levelXPTable[pokemon.level + 1] || 'MAX'}
                        </span>
                        <div className="flex-1 bg-gray-300 rounded-full h-3 overflow-hidden max-w-xs">
                          <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${levelXPTable[pokemon.level + 1] ? (pokemon.currentXP / levelXPTable[pokemon.level + 1]) * 100 : 100}%` }} />
                        </div>
                      </div>
                    </div>
                    <button onClick={() => { setSelectedPokemon(pokemon); setShowXPModal(true); }} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 font-semibold">+XP</button>
                  </div>
                </div>
              ))}
              {currentUser.pc.length === 0 && (
                <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Nenhum Pokémon no PC</div>
              )}
            </div>
          </div>
        </div>
      )}

      {currentUser.type === 'treinador' && currentArea === 'Pokédex' && (
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 mt-4`}>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Pokédex ({currentUser.pokedexCount})</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentUser.pokedex.map((entry, index) => (
                <div key={index} className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'} border-2 rounded-lg p-4 text-center`}>
                  <div className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{entry.species}</div>
                  <div className={`text-sm ${entry.captured ? 'text-green-600' : 'text-blue-600'}`}>
                    {entry.captured ? '✓ Capturado' : '👁 Escaneado'}
                  </div>
                </div>
              ))}
              {currentUser.pokedex.length === 0 && (
                <div className={`col-span-full text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Nenhum Pokémon registrado</div>
              )}
            </div>
          </div>
        </div>
      )}

      {showLevelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-lg p-6 w-80" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Definir Nível</h3>
            <input type="number" min="0" max="50" value={tempLevel} onChange={(e) => setTempLevel(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mb-4" placeholder="Digite o nível (0-50)" />
            <div className="flex gap-2">
              <button onClick={handleLevelChange} className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Confirmar</button>
              <button onClick={closeModal} className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showClassModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Selecione Classe ou Subclasse</h3>
            <input type="text" value={classSearch} onChange={(e) => setClassSearch(e.target.value)} placeholder="Pesquisar..." className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mb-4" />
            <div className="space-y-2">
              {filteredClasses.map((item, i) => (
                <button key={i} onClick={() => handleClassSelect(item.name)} className={`w-full ${item.color} text-white px-4 py-3 rounded-lg hover:opacity-90 flex items-center gap-2 font-semibold`}>
                  {item.isClass && <Crown size={20} />}
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
            <button onClick={closeModal} className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 mt-4">Cancelar</button>
          </div>
        </div>
      )}

      {showSkillsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Selecione Perícias</h3>
            <div className="space-y-4">
              {Object.keys(skillsByAttribute).map((attr) => (
                <div key={attr} className="border-b pb-4">
                  <h4 className="font-semibold text-gray-700 mb-2">{attributeNames[attr]}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillsByAttribute[attr].map((skill) => {
                      const count = getSkillCount(attr, skill);
                      return (
                        <button key={skill} onClick={() => toggleSkill(attr, skill)} className={`px-3 py-2 rounded-lg font-medium ${count > 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                          {skill} {count === 2 ? 'x2' : count === 1 ? '✓' : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={closeModal} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-4">Fechar</button>
          </div>
        </div>
      )}

      {showHPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-lg p-6 w-80" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Dano/Cura Treinador</h3>
            <input type="number" min="1" max="1000" value={hpValue} onChange={(e) => setHpValue(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mb-4" placeholder="Digite o valor (1-1000)" />
            <div className="flex gap-2 mb-2">
              <button onClick={handleHeal} className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 font-semibold">Curar Trainer</button>
              <button onClick={handleDamage} className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 font-semibold">Dano Trainer</button>
            </div>
            <button onClick={closeModal} className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">Cancelar</button>
          </div>
        </div>
      )}

      {showImageUrlModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-lg p-6 w-80" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Adicionar Imagem</h3>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mb-4" placeholder="Cole o link da imagem" />
            <div className="flex gap-2">
              <button onClick={confirmImageUrl} className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Confirmar</button>
              <button onClick={closeModal} className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showAddPokemonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddPokemonModal(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Adicionar Pokémon</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={pokemonForm.captured} onChange={(e) => setPokemonForm({...pokemonForm, captured: e.target.checked})} className="w-4 h-4" />
                  <span className="text-sm font-medium">Capturado?</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={pokemonForm.exotic} onChange={(e) => setPokemonForm({...pokemonForm, exotic: e.target.checked})} className="w-4 h-4" />
                  <span className="text-sm font-medium">Pkm Exótico</span>
                </label>
              </div>

              {pokemonForm.captured && (
                <input
                  type="text"
                  value={pokemonForm.name}
                  onChange={(e) => setPokemonForm({...pokemonForm, name: e.target.value})}
                  placeholder="Nome do Pokémon"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              )}

              {!pokemonForm.exotic ? (
                <select
                  value={pokemonForm.species}
                  onChange={(e) => setPokemonForm({...pokemonForm, species: e.target.value})}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Selecione a Espécie</option>
                  {pokemonSpecies.map((species, i) => (
                    <option key={i} value={species}>{species}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={pokemonForm.exoticName}
                  onChange={(e) => setPokemonForm({...pokemonForm, exoticName: e.target.value})}
                  placeholder="Nome da Espécie Exótica"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              )}

              {pokemonForm.captured && (
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={pokemonForm.level}
                  onChange={(e) => setPokemonForm({...pokemonForm, level: parseInt(e.target.value) || 1})}
                  placeholder="Nível (1-100)"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <button onClick={addPokemon} className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 font-semibold">Adicionar</button>
              <button onClick={() => setShowAddPokemonModal(false)} className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showXPModal && selectedPokemon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowXPModal(false)}>
          <div className="bg-white rounded-lg p-6 w-80" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Adicionar XP</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Pokémon: {selectedPokemon.name || selectedPokemon.species}</p>
              <p className="text-sm text-gray-600 mb-2">Nível Atual: {selectedPokemon.level}</p>
              <p className="text-sm text-gray-600 mb-4">XP Atual: {selectedPokemon.currentXP}/{levelXPTable[selectedPokemon.level + 1] || 'MAX'}</p>
            </div>
            <input
              type="number"
              min="1"
              value={xpToAdd}
              onChange={(e) => setXpToAdd(e.target.value)}
              placeholder="Quantidade de XP"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mb-4"
            />
            <div className="flex gap-2">
              <button onClick={addXPToPokemon} className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-semibold">Adicionar</button>
              <button onClick={() => setShowXPModal(false)} className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;