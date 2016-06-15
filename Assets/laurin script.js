#pragma strict

public var jumpLimit : int = 2;
public var jumpsLeft = jumpLimit;
public var jumpHeight : float  = 10;
public var moveSpeed : float = 5;
public var frictionModifier : float = 0.3; // kaikki arvot yli yhden nopeuttavat liikettä sen hidastamisen sijasta
var canJump = true;
var facingRight = true;

function Start () {

}

function Update () {
	var x;
	var y;

	if (Input.GetKeyDown(KeyCode.Space) && (canJump)) { // hyppypaske
    	x = GetComponent(Rigidbody2D).velocity.x;
        GetComponent(Rigidbody2D).velocity = new Vector2(x, jumpHeight);
        jumpsLeft -= 1;
        if (jumpsLeft <= 0) {
        	canJump = false;
        	}
       }

       if (Input.GetKey(KeyCode.A)) { // liikepaske vasemmalle
		y = GetComponent(Rigidbody2D).velocity.y;
		GetComponent(Rigidbody2D).velocity = new Vector2(-moveSpeed, y);

		if (facingRight) {
				Flip();
			}
        }

        if (Input.GetKeyUp(KeyCode.A)) { // kitka pelaajan ja ympäristön välillä
		y = GetComponent(Rigidbody2D).velocity.y;
		GetComponent(Rigidbody2D).velocity = new Vector2 ((-moveSpeed * frictionModifier), y);
		}

		if (Input.GetKey(KeyCode.D)) { // liikepaske oikealle
		y = GetComponent(Rigidbody2D).velocity.y;
		GetComponent(Rigidbody2D).velocity = new Vector2(moveSpeed, y);

		if (!facingRight) {
			Flip();
			}
        }

        if (Input.GetKeyUp(KeyCode.D)) { // kitka pelaajan ja ympäristön välillä
		y = GetComponent(Rigidbody2D).velocity.y;
		GetComponent(Rigidbody2D).velocity = new Vector2 ((moveSpeed * frictionModifier), y);
		}

		}

	function Flip() { // enyhtäätiiämitetäätoimii
	var flipScale : Vector3;
	var rigidbody : Rigidbody2D;

	rigidbody = GetComponent(Rigidbody2D);
	flipScale = rigidbody.transform.localScale;
	flipScale.x *= -1;
	rigidbody.transform.localScale = flipScale;
	facingRight = !facingRight;

	}

	function OnCollisionEnter2D (coll : Collision2D) {
	if (coll.gameObject.CompareTag("ground")) {
		jumpsLeft = jumpLimit;
		canJump = true;
		}

		}