#pragma strict
//liikkumiseen & hyppimiseen tarcittavat muuttujat
public var nopeus = 0;
public var hypynkorkeus = 0;
public var canHypyt = 2;
public var numHypyt = 0;
//kitka paske
public var frictionModifier : float = 0.3; // kaikki arvot yli yhden nopeuttavat liikettä sen hidastamisen sijasta
//animaatioon tarvittavat muuttujat
var anim : Animator;
var jumpHash : int = Animator.StringToHash("Jump");
var runStateHash : int = Animator.StringToHash("Base Layer.Run");

var animaatiopaska = 1;//muuttuja, jonka arvo on yksi (noshitsherloc)

//hyppy muuttuja
private var canJump = true;
//kääntymispaskea
private var facingRight = true;	


function Start () {//haetaan animaatioon tarvittava komponentti
       anim = GetComponent("Animator");
     }

function Update () {
    var x;
    var y;
//animaattori paska
       var move : float = Input.GetAxis ("Vertical");
       anim.SetFloat("Speed", move);

       var stateInfo : AnimatorStateInfo = anim.GetCurrentAnimatorStateInfo(0);
       if(Input.GetKeyDown(KeyCode.Space) && animaatiopaska > numHypyt)
   {
       anim.SetTrigger (jumpHash);
   }


        if (Input.GetKeyDown(KeyCode.Space) && numHypyt < canHypyt) { //hyppy paska
        x = GetComponent(Rigidbody2D).velocity.x;
        GetComponent(Rigidbody2D).velocity = new Vector2(x,hypynkorkeus);
        ++numHypyt;
        }


        if (Input.GetKey(KeyCode.A)) { //liike ja kääntyminen vasemmalle
        y = GetComponent(Rigidbody2D).velocity.y;
        GetComponent(Rigidbody2D).velocity = new Vector2(-nopeus,y);

        if (!facingRight) {
				Flip();
			}
			}

		if (Input.GetKeyUp(KeyCode.A)) { // kitka pelaajan ja ympäristön välillä
		y = GetComponent(Rigidbody2D).velocity.y;
		GetComponent(Rigidbody2D).velocity = new Vector2 ((-nopeus * frictionModifier), y);
		}

        if (Input.GetKey(KeyCode.D)) { //liike ja kääntyminen oikealle
        y = GetComponent(Rigidbody2D).velocity.y;
        GetComponent(Rigidbody2D).velocity = new Vector2(nopeus,y);
       
        if (facingRight) {
			Flip();
			}
			}

		if (Input.GetKeyUp(KeyCode.D)) { // kitka pelaajan ja ympäristön välillä
		y = GetComponent(Rigidbody2D).velocity.y;
		GetComponent(Rigidbody2D).velocity = new Vector2 ((nopeus * frictionModifier), y);
		}
}

function Flip() { // enyhtäätiiämitetäätoimii //no siis kääntymispaska tässä näin
	var flipScale : Vector3;
	var rigidbody : Rigidbody2D;

	rigidbody = GetComponent(Rigidbody2D);
	flipScale = rigidbody.transform.localScale;
	flipScale.x *= -1;
	rigidbody.transform.localScale = flipScale;
	facingRight = !facingRight;

	    }

function OnCollisionEnter2D (coll : Collision2D) { //numhypyt nolaantyy ko kosketaan maata
        if     (coll.gameObject.CompareTag("ground"))    {
        numHypyt = 0;
        }

        if     (coll.gameObject.CompareTag("Enemy"))    {
        numHypyt = 0;
        }
        }

