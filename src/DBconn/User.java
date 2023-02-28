package DBconn;

public class User {
	public String name;
	public String type;
	public User(String name,String type) {
		this.name=name;
		this.type=type;
	}
	public String get_name() {
		return name;
	}
	public String get_type() {
		return type;
	}
}
