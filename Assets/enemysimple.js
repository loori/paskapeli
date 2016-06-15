#pragma strict

var staticEnemy : boolean = false;
var directionRight : boolean = true;
var moveSpeed : int = 5;

function Start () {


}

function Update () {
	var x;
	var y;

		if ((staticEnemy == false) && (directionRight == true)) {
		x = GetComponent(Rigidbody2D).velocity.x;
		y = GetComponent(Rigidbody2D).velocity.y;
		GetComponent(Rigidbody2D).velocity = new Vector2(moveSpeed, y);
		}

		if ((staticEnemy == false) && (directionRight == false)) {
		x = GetComponent(Rigidbody2D).velocity.x;
		y = GetComponent(Rigidbody2D).velocity.y;
		GetComponent(Rigidbody2D).velocity = new Vector2(-moveSpeed, y);
		}

		if (staticEnemy == true) {
		x = 0;
	    y = 0;
		GetComponent(Rigidbody2D).velocity = new Vector2(x, y);
		}
		}

function OnTriggerEnter2D (trig : Collider2D) {
		if (trig.gameObject.CompareTag("directionTrigger")) {
		directionRight = !directionRight;
		}

		}
