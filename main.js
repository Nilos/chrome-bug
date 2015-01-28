define(["sjclWorkerInclude", "minimalHelper", "sjcl"], function (sjclWorkerInclude, chelper, sjcl) {
	var case1 = '{"curve":"c256","point":{"x":"0x71ac071ede0776f5c360dcfc7697f4dabe1018cc810eaa202c525c10fc8edcbb","y":"0x42ac5d09549ba7235fb232848dab833e7d8408f1a9a01138834f1f669f0c4c34"},"signature":"3e05cddafc27452a156160fd83ded24e01e2c55f8b4ba5f856d9caf0f3218f1b4cacd0622ae4fa066978dccaa8770c8d85826bd427b7127431b80925f86ffebe","hash":"d820a8a50332365f13a4a7e37cd203bf1a69003c0eaf2f9425486f247b2872d6"}';

	function parse(data) {
		data = JSON.parse(data);

		var curve = chelper.getCurve(data.curve);

		var x =	new curve.field(data.point.x);
		var y = new curve.field(data.point.y);
		var point = new sjcl.ecc.point(curve, x, y);

		return {
			publicKey: new sjcl.ecc.ecdsa.publicKey(curve, point),
			signature: sjcl.codec.hex.toBits(data.signature),
			hash: sjcl.codec.hex.toBits(data.signature)
		};
	}

	var case1Data = parse(case1);

	function run(data) {
		var time = new Date().getTime();
		sjclWorkerInclude.asym.verify(data.publicKey, data.signature, data.hash, function () {
			document.body.innerHTML = document.body.innerHTML + ".";
		});
	}

	window.setInterval(function () {
		run(case1Data);
	}, 500);

});