#pragma strict

public var playerHealth : int = 3;
public var invulnerabilityPeriod : float = 1.0;
public var lastHitTime : float = 0.0;

function Start () {

}

function Update () {

}

function TakeDamage() {
	--playerHealth;
	lastHitTime = Time.time;
}

function OnCollisionEnter2D (coll : Collision2D) {
	if ((coll.gameObject.CompareTag("Enemy")) && (playerHealth > 0) && (Time.time > (lastHitTime + invulnerabilityPeriod))) {
		TakeDamage();
		}
		}