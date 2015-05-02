module.exports = (grunt) ->
	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'
		coffee:
			compile:
				options:
					bare: true
				expand: true
				cwd: 'src'
				dest: 'build'
				src: [ '**/*.coffee' ]
				ext: '.js'
		concat:
			dist:
				src: [
					'src/fragments/prefix.js'
					'build/ko-router-core.js'
					'build/ko-router-extension.js'
					'src/fragments/suffix.js'
				]
				dest: 'dist/<%= pkg.name %>-debug.js'
		uglify:
			dist:
				files:
					'dist/<%= pkg.name %>.js': 'dist/<%= pkg.name %>-debug.js'
		watch:
			compile:
				files: 'src/**/*.coffee'
				tasks: [ 'coffee', 'concat', 'uglify' ]

	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-jasmine'

	grunt.registerTask 'default', [ 'coffee', 'concat', 'uglify' ]