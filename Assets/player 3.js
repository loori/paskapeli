#pragma strict

public var nopeus = 0;
public var hypynkorkeus = 0;
public var canHypyt = 2;
public var numHypyt = 0;

var anim : Animator;
var jumpHash : int = Animator.StringToHash("Jump");
var runStateHash : int = Animator.StringToHash("Base Layer.Run");

var animaatiopaska = 1;


private var canJump = true;
private var facingRight = true;	


function Start () {
       anim = GetComponent("Animator");
     }

function Update () {
    var x;
    var y;

       var move : float = Input.GetAxis ("Vertical");
       anim.SetFloat("Speed", move);

       var stateInfo : AnimatorStateInfo = anim.GetCurrentAnimatorStateInfo(0);
       if(Input.GetKeyDown(KeyCode.Space) && animaatiopaska > numHypyt)
   {
       anim.SetTrigger (jumpHash);
   }


        if (Input.GetKeyDown(KeyCode.Space) && numHypyt < canHypyt) {
        x = GetComponent(Rigidbody2D).velocity.x;
        GetComponent(Rigidbody2D).velocity = new Vector2(x,hypynkorkeus);
        ++numHypyt;
        }


        if (Input.GetKey(KeyCode.A)) {
        y = GetComponent(Rigidbody2D).velocity.y;
        GetComponent(Rigidbody2D).velocity = new Vector2(-nopeus,y);
        }

        if (Input.GetKey(KeyCode.D)) {
        y = GetComponent(Rigidbody2D).velocity.y;
        GetComponent(Rigidbody2D).velocity = new Vector2(nopeus,y);
        }
}

function OnCollisionEnter2D (coll : Collision2D) {
        if     (coll.gameObject.CompareTag("ground"))    {
        numHypyt = 0;
        }
        }






		


