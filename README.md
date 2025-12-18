# 🎮 Niaypeta Corp™ - Sistema Pokémon RPG

Sistema completo de gerenciamento de treinadores Pokémon com contas independentes.

## 🚀 Deploy no Netlify (Método Recomendado)

### Opção 1: Deploy via Drag & Drop (Mais Fácil)

1. **Instale as dependências e faça o build localmente:**
   ```bash
   npm install
   npm run build
   ```

2. **Acesse o Netlify:**
   - Vá para https://app.netlify.com
   - Crie uma conta gratuita (ou faça login)

3. **Faça o Deploy:**
   - Na página inicial, arraste a pasta `dist` para a área "Drag and drop your site output folder here"
   - Aguarde o upload (alguns segundos)
   - Pronto! Seu site estará no ar! 🎉

### Opção 2: Deploy via GitHub (Recomendado para atualizações)

1. **Crie um repositório no GitHub:**
   - Vá para https://github.com/new
   - Dê um nome ao repositório (ex: `pokemon-rpg`)
   - Deixe público ou privado (sua escolha)

2. **Faça upload dos arquivos:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
   git push -u origin main
   ```

3. **Conecte ao Netlify:**
   - No Netlify, clique em "Add new site" → "Import an existing project"
   - Escolha GitHub e autorize
   - Selecione seu repositório
   - Configure o build:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Clique em "Deploy site"

4. **Pronto!** Toda vez que você fizer push no GitHub, o site será atualizado automaticamente!

## 💻 Executar Localmente

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# O site estará disponível em http://localhost:5173
```

## 📝 Credenciais de Login

**Senha para todos os usuários:** `DnD7MarPkm`

**Usuários disponíveis:**
- Mestre (Tipo: Mestre)
- Alocin (Tipo: Treinador)
- Lila (Tipo: Treinador)
- Ludovic (Tipo: Treinador)
- Noryat (Tipo: Treinador)
- Pedro (Tipo: Treinador)

## ✨ Funcionalidades

### Contas de Treinador:
- ✅ Sistema de login com contas independentes
- ✅ Upload de imagem do treinador
- ✅ Sistema de níveis (0-50)
- ✅ HP com barra de vida e porcentagem
- ✅ Sistema de dano/cura
- ✅ 6 atributos principais (Saúde, Ataque, Defesa, Ataque Especial, Defesa Especial, Velocidade)
- ✅ Modificadores automáticos baseados em atributos
- ✅ Sistema de perícias/skills por atributo
- ✅ 4 slots de classes e subclasses
- ✅ Cálculo automático de deslocamentos (Terrestre, Natação, Subaquático)
- ✅ Cálculo automático de evasão (Física, Especial, Veloz)
- ✅ Time principal com 6 slots para Pokémon
- ✅ Sistema de XP e level up automático para Pokémon
- ✅ PC para armazenamento (até 1000 Pokémon)
- ✅ Pokédex
- ✅ Modo escuro/claro
- ✅ Captura de Pokémon normais e exóticos

### Conta Mestre:
- Gerenciamento de NPCs
- Visualização de todos os treinadores

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework JavaScript
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones

## 📦 Estrutura do Projeto

```
pokemon-rpg/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Ponto de entrada
│   └── index.css        # Estilos globais
├── index.html           # HTML principal
├── package.json         # Dependências
├── vite.config.js       # Configuração Vite
├── tailwind.config.js   # Configuração Tailwind
└── postcss.config.js    # Configuração PostCSS
```

## 🆘 Problemas Comuns

**Erro ao instalar dependências:**
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

**Site não carrega no Netlify:**
- Verifique se a pasta `dist` foi criada corretamente
- Confirme que o "Publish directory" está configurado como `dist`

**Erros de CSS:**
```bash
# Reinstale o Tailwind
npm install -D tailwindcss postcss autoprefixer
```

## 📞 Suporte

Em caso de dúvidas, verifique:
1. As mensagens de erro no console do navegador (F12)
2. Os logs de build no Netlify
3. Se todas as dependências foram instaladas

---

Desenvolvido com ❤️ para jogadores de Pokémon RPG
