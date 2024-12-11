import cds from "@sap/cds/eslint.config.mjs";
import cdsPlugin from "@sap/eslint-plugin-cds";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import jestPlugin from "eslint-plugin-jest";

export default tseslint.config(
	eslint.configs.recommended,

	...tseslint.configs.recommended,
	{
		ignores: ["**/app/**/*.js", "**/srv/external/*"],
	},
	{
		// enable jest rules on test files
		files: ["test/**/*.ts"],
		...jestPlugin.configs["flat/recommended"],
	},
	...cds.recommended,
	cdsPlugin.configs.recommended, // init cdsPlugin
	{
		//config cdsPlugin
		plugins: { "@sap/cds": cdsPlugin },
		rules: {
			"@sap/cds/no-db-keywords": "error",
			"@sap/cds/start-elements-lowercase": "warn",
			"@sap/cds/start-entities-uppercase": "warn",
			"@sap/cds/no-dollar-prefixed-names": "error"
		},
	},
	{ rules: { "no-unused-vars": "off", } } // turn off duplicate rule by eslint and @typescript-eslint
);
