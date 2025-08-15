# Vue Minesweeper 💣

Um jogo Campo Minado clássico desenvolvido com Vue.js 2, modernizado com Vite e pronto para deploy no GitHub Pages.

[🎮 **Jogar Online**](https://willianszwy.github.io/vue-minesweeper/) | [📖 **Documentação**](#-como-jogar) | [🚀 **Deploy**](#-deploy-no-github-pages)

![Vue Minesweeper Screenshot](https://img.shields.io/badge/Vue.js-2.7-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-green?style=for-the-badge&logo=github&logoColor=white)

## ✨ Características

- 🎯 **Jogo clássico**: Campo Minado tradicional com grid 15x10
- 🎨 **Design moderno**: Interface colorida com animações suaves
- ⚡ **Build rápido**: Powered by Vite para desenvolvimento ágil
- 🚀 **Auto-deploy**: CI/CD automático com GitHub Actions
- 📱 **Responsivo**: Funciona perfeitamente em desktop e mobile
- 🎮 **UX aprimorada**: Reinício automático e feedback visual
- 💾 **Zero config**: Pronto para usar, sem configurações complexas

## 🛠 Stack Tecnológica

| Tecnologia | Versão | Função |
|------------|---------|---------|
| **Vue.js** | 2.7.16 | Framework reativo |
| **Vite** | 5.4.2 | Build tool moderna |
| **SCSS** | 1.77.8 | Pré-processador CSS |
| **GitHub Actions** | Latest | CI/CD automático |

## 📦 Instalação e Uso

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Comandos

```bash
# 📥 Clonar o repositório
git clone https://github.com/willianszwy/vue-minesweeper.git
cd vue-minesweeper

# 📦 Instalar dependências
npm install

# 🔥 Servidor de desenvolvimento (localhost:8080)
npm run dev

# 🏗️ Build para produção
npm run build

# 👀 Preview do build local
npm run preview

# 🚀 Deploy direto para GitHub Pages
npm run deploy
```

## 🎮 Como Jogar

### Regras Básicas
1. **Objetivo**: Revelar todas as células que não contêm minas
2. **Clique**: Clique em qualquer célula para começar
3. **Números**: Indicam quantas minas estão nas 8 células adjacentes
4. **Minas**: Evite clicar nas células com minas (💣)
5. **Vitória**: Revele todas as células seguras para ganhar!

### Mecânicas do Jogo
- **Grid**: 15 colunas × 10 linhas = 150 células
- **Minas**: ~7-8 minas (5% do grid)
- **Auto-reveal**: Células vazias revelam áreas adjacentes automaticamente
- **Game Over**: Clicar em mina revela todas as minas
- **Auto-restart**: Jogo reinicia automaticamente após 2 segundos

## 🚀 Deploy no GitHub Pages

### Setup Automático
O projeto inclui workflow do GitHub Actions para deploy automático:

1. **Fork/Clone** este repositório
2. **Configure** o nome do repo em `vite.config.js`:
   ```js
   export default defineConfig({
     base: '/SEU-REPO-NAME/', // Altere aqui
     // ... resto da config
   })
   ```
3. **Ative GitHub Pages** nas configurações do repositório:
   - Settings → Pages → Source: "GitHub Actions"
4. **Push para main** e aguarde o deploy automático! 🎉

### Deploy Manual
```bash
# Build e deploy em um comando
npm run deploy
```

## 🏗️ Arquitetura do Projeto

```
src/
├── 📄 App.vue           # Componente raiz
├── 🎮 MinesSweeper.vue  # Componente principal do jogo
├── 💬 Message.vue       # Overlay de mensagens (win/lose)
├── 🧠 MinesSweeper.js   # Lógica core do jogo
└── 📸 assets/           # Imagens (mine.png, dead.png)

public/
└── 🖼️ assets/           # Assets públicos
```

### Componentes Principais

- **MinesSweeper.js**: Classe principal com lógica do jogo
- **GridElement**: Representa cada célula do grid
- **Array2D**: Utilitário para arrays bidimensionais

## 🔧 Customização

### Alterar Dificuldade
```js
// src/MinesSweeper.vue linha 44
game: new MinesSweeper(0.05) // 5% de minas (fácil)
// 0.15 = 15% (médio)
// 0.25 = 25% (difícil)
```

### Alterar Tamanho do Grid
```js
// src/MinesSweeper.js linhas 4-5
this._width = 15;  // Largura
this._height = 10; // Altura
```

## 🐛 Troubleshooting

### Problemas Comuns

**Build falha no GitHub Actions:**
- Verifique se o `base` no `vite.config.js` está correto
- Confirme que GitHub Pages está ativo

**Imagens não carregam:**
- Assets devem estar em `public/assets/`
- Use paths absolutos: `/assets/image.png`

**Servidor de desenvolvimento não abre:**
- Porta 8080 pode estar ocupada
- Altere a porta em `vite.config.js`

## 📈 Roadmap

- [ ] 🚩 Sistema de bandeiras (right-click)
- [ ] ⏱️ Timer e contador de minas
- [ ] 🏆 Sistema de high scores
- [ ] 🎨 Temas personalizáveis
- [ ] 📊 Estatísticas de jogo
- [ ] 🔊 Efeitos sonoros

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'Adiciona nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido com ❤️ por [@willianszwy](https://github.com/willianszwy)**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/willianszwy)
[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/)


