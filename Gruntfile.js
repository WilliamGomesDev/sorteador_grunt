//configuração inicial da ferramenta
module.exports = function(grunt) {
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        less: {
            development: { // o uso desssa palavra 'development' é aplicado porque podemos usar diferentes ambientes, nesse caso é um ambiente de desevolvimento ná máquina local. 
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            }, //o ambiente de produção é onde o site "roda", como no caso da Vercel.
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks:['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks:['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand:true,
                        flatten:true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand:true,
                        flatten:true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less'); //configuração do plugin LESS para Grunt, utilizado para compilar arquivos LESS em CSS.
    grunt.loadNpmTasks('grunt-contrib-watch'); //configuração do plugin WATCH para Grunt, utilizado para monitorar arquivos e executar tarefas quando eles são modificados.
    grunt.loadNpmTasks('grunt-replace'); //configuração do plugin REPLACE para Grunt, Sua função principal é substituir strings dentro de arquivos.
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); //configuração do plugin HTMLMIN para Grunt, é utilizado para minimizar arquivos HTML, removendo espaços em branco, comentários e outros elementos que não afetam a renderização, com o objetivo de reduzir o tamanho dos arquivos e melhorar o desempenho da página.
    grunt.loadNpmTasks('grunt-contrib-clean'); //configuração do plugin CLEAN para Grunt, sua função principal é excluir arquivos e diretórios de forma recursiva.
    grunt.loadNpmTasks('grunt-contrib-uglify'); //configuração do plugin UGLIFY para Grunt, sua função principal é carregar o plugin Uglify para minificar arquivos JavaScript.



    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist','clean', 'uglify']);
}