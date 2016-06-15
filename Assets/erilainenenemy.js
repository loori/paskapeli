#pragma strict


var aika : float = 10.0;//aika
var resetaika : float = 10.0;//uusi aika, mikä tulee käyttöön sen jälkeen, kun aika on nollaantunut
var kaantymisaika : float = 5.0;//aika, mistä eteenpäin enemy kulkee toiseen suuntaan

var staticEnemy : boolean = false;//tämmönen jänskä jutska tässä
var moveSpeed : int = 5;//opettele englantia, jos et tätä ymmärrä

var anim : Animator;//animaattori

private var facingRight = true;//kääntymisjutska


function Start () {//animaatio paske
	anim = GetComponent("Animator");
}

function Update () {



		if (aika > 0) {//simppeli ajastin
		aika -= Time.deltaTime;
		}

		if (aika <= 0)  {//kun aika on 0, muuttuu aika resetajan arvoon
		aika = resetaika + 0.0;//ei mitään tietoa miksi laiton "resetaika + 0", enkä vaan resetaika, mutta nvm.
	}//turha sitä on korjatakaan se toimii nyt täydellisesti

			

	var x;
	var y;
	//liikkuu niin kauan ko aika on pienempi ko kääntymisaika
		if ((staticEnemy == false) && aika > kaantymisaika) {
		x = GetComponent(Rigidbody2D).velocity.x;
		y = GetComponent(Rigidbody2D).velocity.y;
		GetComponent(Rigidbody2D).velocity = new Vector2(moveSpeed, y);
	
		if (!facingRight) {
				Flip();
}
}


		//sama kuin ylempänä, mutta päivastoin
		if ((staticEnemy == false) && aika < kaantymisaika) {
		x = GetComponent(Rigidbody2D).velocity.x;
		y = GetComponent(Rigidbody2D).velocity.y;
		GetComponent(Rigidbody2D).velocity = new Vector2(-moveSpeed, y);

		if (facingRight) {
			Flip();
}
}

			//laittaa sen paikoilleen jos niin haluat
		if (staticEnemy == true) {
		x = 0;
	    y = 0;
		GetComponent(Rigidbody2D).velocity = new Vector2(x, y);
		}
		} //lauri on homo (ei niin että mulla ois mitään homoja vastaan tho)
		// ai lauri on hetero ja kuningas kyllä samaa mieltä




	function Flip() { // enyhtäätiiämitetäätoimii //no siis kääntymispaska tässä näin
	var flipScale : Vector3;
	var rigidbody : Rigidbody2D;

	rigidbody = GetComponent(Rigidbody2D);
	flipScale = rigidbody.transform.localScale;
	flipScale.x *= -1;
	rigidbody.transform.localScale = flipScale;
	facingRight = !facingRight;
	}





	