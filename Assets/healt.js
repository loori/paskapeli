#pragma strict

var playerHealth = 3;

function Start () {
}

function Update () {
}

function OnCollisionEnter2D (coll : Collision2D) {
	if (coll.gameObject.CompareTag("Enemy")){
		--playerHealth;
		}
}
