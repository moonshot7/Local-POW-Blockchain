const crypto = require('crypto');

const from = "-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALcJWtZ5NkttDNVEN1/Koty29SlMc9ur\nfRqszvs58rGOdDOgkCtURbog0mOKI+A8PNzopfFqhJkLRtI6+EQDs9kCAwEAAQ==\n-----END PUBLIC KEY-----\n";
const to = "-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAN4iOwF1GgU1sCQvRMHm4ZAu8TIk3sdI\nqYxqa5pE7eyn3keZwDv5DKMcp0Vjupw7a5MnbuItAalu2xjwHrmarEkCAwEAAQ==\n-----END PUBLIC KEY-----\n";
const amount = 50;

// clé privée 
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAtwla1nk2S20M1UQ3
X8qi3Lb1KUxz26t9GqzO+znysY50M6CQK1RFuiDSY4oj4Dw83Oil8WqEmQtG0jr4
RAOz2QIDAQABAkAL/hrrjomWK5D5sDyIlDhTidFKYW396KCLzOLK5yMVqwk4BdHa
mBvIFGCabsucU24aocWafqGCoQ4owgO8p95hAiEA8umvm+nrVLCShIBEomzkYCSM
V2nrBcwwNIh8RhbExgUCIQDA5dcWVRYMzuHZG3ezlQZl9Q8lnYrxEpM+iSsNWjiq
xQIgKaZh4uTf4dyIsslfe04adlWt7osNrifNmCRS0p2yzZUCIQC9ewgkr7/RJQdE
tG6IwMJgNLCESpTI6W4p56Oaoh034QIhALRKqFsJrjZBY8kPtFjJwPi8GsY1FPa+
hT0KkDQwiMMs
-----END PRIVATE KEY-----`;

const sign = crypto.createSign('RSA-SHA256');
sign.update(from + to + amount);
const signature = sign.sign(privateKey, 'base64');

console.log("Signature:", signature);
