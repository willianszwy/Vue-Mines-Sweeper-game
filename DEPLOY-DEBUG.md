# 🔧 Debug do Deploy GitHub Pages

## Problemas Comuns e Soluções

### 1. Action não executou

**Verificações:**
```bash
# 1. Confirme que está na branch correta
git branch

# 2. Verifique se o workflow existe
ls -la .github/workflows/

# 3. Force push para trigger
git add .
git commit -m "trigger workflow"
git push origin main
```

### 2. Configurar GitHub Pages Manualmente

**No GitHub.com:**
1. Vá em **Settings** → **Pages**
2. Source: **GitHub Actions** (não Deploy from branch)
3. Aguarde alguns minutos

### 3. Debug do Workflow

**Verificar logs:**
1. GitHub repo → **Actions** tab
2. Clique no workflow que falhou
3. Verifique cada step

### 4. Deploy Manual de Emergência

```bash
# Opção 1: Usar gh-pages diretamente
npm install -g gh-pages
npm run build
npx gh-pages -d dist

# Opção 2: Deploy manual via git
npm run build
cd dist
git init
git add .
git commit -m "deploy"
git branch -M gh-pages
git remote add origin https://github.com/SEU_USER/SEU_REPO.git
git push -f origin gh-pages
```

### 5. Configurações que devem estar corretas

**vite.config.js:**
```js
base: '/SEU-REPO-NAME/' // Nome exato do repositório
```

**package.json:**
```json
{
  "homepage": "https://SEU_USER.github.io/SEU_REPO"
}
```

### 6. Workflow Alternativo

Se o workflow principal falhar, renomeie o backup:
```bash
mv .github/workflows/deploy-simple.yml.backup .github/workflows/deploy-simple.yml
```

### 7. Permissões do GitHub

Vá em **Settings** → **Actions** → **General**:
- Workflow permissions: **Read and write**
- Allow GitHub Actions to create PRs: ✅

## Teste Rápido

```bash
# 1. Build local
npm run build

# 2. Preview local
npm run preview
# Acesse http://localhost:4173/vue-minesweeper/

# 3. Se funcionar local, o problema é no deploy
```

## URLs Finais

Após deploy bem-sucedido:
- **URL do jogo**: https://SEU_USER.github.io/SEU_REPO/
- **Logs do Actions**: https://github.com/SEU_USER/SEU_REPO/actions