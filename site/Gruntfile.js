/* Reference: http://adrianmejia.com/blog/2014/10/07/grunt-js-tutorial-from-beginner-to-ninja/ */
/* Reference installing grunt packages: https://developer.tizen.org/dev-guide/2.2.0/org.tizen.web.appprogramming/html/guide/w3c_guide/perf_guide/install_use_grunt.htm */
var grunt = require('grunt');


grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-jsdoc');	




module.exports = function(grunt){


	grunt.initConfig({
		jshint: {
			  all: [
				'scripts/amdRegex.js',
				'scripts/amdUtil.js',
				'scripts/main.js'
			  ]
		},
		csslint: {
			  all: [
				'styles/**/*.css'
			  ]
		},
		cssmin: {
		  target: {
			files: [{
			  expand: true,
			  cwd: 'styles', /* working direetory */
			  src: ['*.css', '!*.min.css'],
			  dest: 'minified', /* write individual min files here */
			  ext: '.min.css'
			}]
		  }
		},
		
	   uglify: {
			compress: {
				files: {
				  'scripts/minified/main.js': ['scripts/main.js'],
				  'scripts/minified/amdRegex.js': ['scripts/amdRegex.js'],
				  'scripts/minified/amdUtil.js': ['scripts/amdUtil.js']
				}
			}
		},
		clean:{
			css:['minified'],
			js:['scripts/minified']
		},
		jsdoc : {
		    dist : {
		        src: ['scripts/**/*.js', 'README.md'],
		        options: {
		            destination: 'doc',
		            template:"node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
		            configure:"node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
		        }
		    }
		}			
	})
};

grunt.registerTask('de', function(){console.log('Reached de');});

grunt.registerTask('default', [
	'jshint',
	'csslint',
	'cssmin',
	'uglify'
]);
grunt.registerTask('lintjs', [
	'jshint'
]);
grunt.registerTask('lintcss', [
	'csslint'
]);
grunt.registerTask('lintjsmin', [
	'uglify'
]);
grunt.registerTask('lintcssmin', [
	'cssmin'
]);
grunt.registerTask('lintclean', ['clean']);
grunt.registerTask('lintjsdoc', [
	'jsdoc'
]);


