#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter2D (trig : Collider2D) {
	if (trig.gameObject.CompareTag("EnemyHead")) {
	Destroy(gameObject.Find("Enemy"));
	Destroy(gameObject.Find("EnemyHead"));
	}
}

