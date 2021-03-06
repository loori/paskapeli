#pragma strict

public var playerSpeed : int = 5;
public var jumpHeight : int = 5;
public var jumpLimit : int = 2;
public var jumpsUsed : int = 0;
public var frictionModifier : float = 0.3; // kaikki arvot yli yhden nopeuttavat liikettä sen hidastamisen sijasta ELI KÄYTÄ < 1

var anim : Animator;
var jumpHash : int = Animator.StringToHash("Jump");
var runStateHash : int = Animator.StringToHash("Base Layer.Run");

var kysymysVitunMerkki = 1; // elmeri mikä vittu tää on saan syövän kohta
var grounded = false;

private var canJump = true;
private var facingRight = true;




function Start () {

	anim = GetComponent("Animator");

}

function Update () {

    var x;
    var y;

    var move : float = Input.GetAxis ("Horizontal");
    anim.SetFloat("Speed", Mathf.Abs(move));
    var stateInfo : AnimatorStateInfo = anim.GetCurrentAnimatorStateInfo(0);

    if(Input.GetKeyDown(KeyCode.Space) && kysymysVitunMerkki > jumpLimit) {
    	anim.SetTrigger (jumpHash);
    	}


	if (Input.GetKeyDown(KeyCode.Space) && jumpsUsed < jumpLimit) { // hyppy
        x = GetComponent(Rigidbody2D).velocity.x;
        GetComponent(Rigidbody2D).velocity = new Vector2(x, jumpHeight);
        ++jumpsUsed;
        }


	if (Input.GetKey(KeyCode.A)) { // liike ja kääntyminen vasemmalle
        y = GetComponent(Rigidbody2D).velocity.y;
        GetComponent(Rigidbody2D).velocity = new Vector2(-playerSpeed, y);

    	if (facingRight) {
			Flip();
			}
		}

	if (Input.GetKeyUp(KeyCode.A)) { // kitka pelaajan ja ympäristön välillä
		y = GetComponent(Rigidbody2D).velocity.y;
		GetComponent(Rigidbody2D).velocity = new Vector2 ((-playerSpeed * frictionModifier), y);
		}
			
    if (Input.GetKey(KeyCode.D)) { // liike ja kääntyminen oikealle
        y = GetComponent(Rigidbody2D).velocity.y;
        GetComponent(Rigidbody2D).velocity = new Vector2(playerSpeed, y);
       
        if (!facingRight) {
			Flip();
			}
		}

	if (Input.GetKeyUp(KeyCode.D)) { // kitka pelaajan ja ympäristön välillä
		y = GetComponent(Rigidbody2D).velocity.y;
		GetComponent(Rigidbody2D).velocity = new Vector2 ((playerSpeed * frictionModifier), y);
		}

}

function Flip() { // enyhtäätiiämitetäätoimii // no siis kääntymispaska tässä näin

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
		var grounded = true;
        jumpsUsed = 0;
        }

    if (coll.gameObject.CompareTag("enemy")) {
        jumpsUsed = 0;
        }

}
