const glob = require('glob');

module.exports = (app) => {
	glob('src/**/routes.js', (err, files) => {
		files.forEach((file)=> {
			if (file.substr(-3, 3) === '.js') {
				require(`./${file.substr(4).replace('.js', '')}`)(app);
			}
		});
	});
};