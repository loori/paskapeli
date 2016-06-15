public var xMargin : float = 10.0;
public var yMargin : float = 10.0;
public var xSmooth : float = 7.0;
public var ySmooth : float = 7.0;
private var player : Transform;
public var minXY : Vector2;
public var maxXY : Vector2;

function Awake () {
	player = GameObject.FindGameObjectWithTag("player").transform;
}

function CheckX () {
	return Mathf.Abs((transform.position.x - player.position.x)) > xMargin;
}

function CheckY () {
	return Mathf.Abs((transform.position.y - player.position.y)) > yMargin;
}

function TrackPlayer () {
	var targetX : float = transform.position.x;
	var targetY : float = transform.position.y;

	if (CheckX()) {
		targetX = Mathf.Lerp(transform.position.x, player.position.x, xSmooth * Time.deltaTime);
		}

	if (CheckY()) {
		targetY = Mathf.Lerp(transform.position.y, player.position.y, ySmooth * Time.deltaTime);
		}

	targetX = Mathf.Clamp(targetX, minXY.x, maxXY.x);
	targetY = Mathf.Clamp(targetY, minXY.y, maxXY.y);

	transform.position = Vector3(targetX, targetY, transform.position.z);

}

function FixedUpdate () {
	TrackPlayer ();
}