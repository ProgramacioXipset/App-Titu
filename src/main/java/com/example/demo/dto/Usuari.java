package com.example.demo.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@Entity
@Table(name= "usuari")
public class Usuari {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name="username")
	private String username;
	
	@Column(name="cognoms")
	private String cognoms;
	
	@Column(name="telefon")
	private Integer telefon;

	@Column(name="email")
	private String email;

	@Column(name="password")
	private String password;

	@ManyToOne
	@JoinColumn(name = "id_rol")
    @JsonIgnoreProperties("usuari")
	Rol id_rol;
	
	public Usuari() {
		
	}

	public Usuari(int id, String username, String cognoms, Integer telefon, String email, String password, Rol id_rol) {
		super();
		this.id = id;
		this.username = username;
		this.cognoms = cognoms;
		this.telefon = telefon;
		this.email = email;
		this.password = password;
		this.id_rol = id_rol;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getCognoms() {
		return cognoms;
	}

	public void setCognoms(String cognoms) {
		this.cognoms = cognoms;
	}

	public Integer getTelefon() {
		return telefon;
	}

	public void setTelefon(Integer telefon) {
		this.telefon = telefon;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Rol getId_rol() {
		return id_rol;
	}

	public void setId_rol(Rol id_rol) {
		this.id_rol = id_rol;
	}

	@Override
	public String toString() {
		return "Usuari [id=" + id + ", username=" + username + ", cognoms=" + cognoms + ", telefon=" + telefon + ", email="
				+ email + ", password=" + password + ", id_rol=" + id_rol + "]";
	}
	
}
