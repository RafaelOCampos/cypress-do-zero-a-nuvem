const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {},
  projectId: "u7vm8i"
  //video: true //quando roda em modo headles por default não salva mais o video
})
