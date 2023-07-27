package com.example.demo.dto;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="ruta")
public class Ruta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)//busca ultimo valor e incrementa desde id final de db
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "id_xofer")
    @JsonIgnoreProperties("ruta")
	Xofer id_xofer;
	
	@Column(name = "data_inici")//no hace falta si se llama igual
	private String data_inici;
	
	@Column(name = "data_final")//no hace falta si se llama igual
	private String data_final;
	
	@OneToMany(mappedBy = "id_ruta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("id_ruta")
	private List<Anada> anada;
	
	@OneToMany(mappedBy = "id_ruta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("id_ruta")
	private List<AvuiXAvui> avui_x_avui;
	
	@OneToMany(mappedBy = "id_ruta", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("id_ruta")
	private List<Tornada> tornada;

	public Ruta() {
		super();
	}

	public Ruta(int id, Xofer id_xofer, String data_inici, String data_final, boolean externa, List<Anada> anada,
			List<AvuiXAvui> avui_x_avui, List<Tornada> tornada) {
		super();
		this.id = id;
		this.id_xofer = id_xofer;
		this.data_inici = data_inici;
		this.data_final = data_final;
		this.anada = anada;
		this.avui_x_avui = avui_x_avui;
		this.tornada = tornada;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Xofer getId_xofer() {
		return id_xofer;
	}

	public void setId_xofer(Xofer id_xofer) {
		this.id_xofer = id_xofer;
	}

	public String getData_inici() {
		return data_inici;
	}

	public void setData_inici(String data_inici) {
		this.data_inici = data_inici;
	}

	public String getData_final() {
		return data_final;
	}

	public void setData_final(String data_final) {
		this.data_final = data_final;
	}
	
	public List<Anada> getAnada() {
		return anada;
	}

	public void setAnada(List<Anada> anada) {
		this.anada = anada;
	}

	public List<AvuiXAvui> getAvui_x_avui() {
		return avui_x_avui;
	}

	public void setAvui_x_avui(List<AvuiXAvui> avui_x_avui) {
		this.avui_x_avui = avui_x_avui;
	}

	public List<Tornada> getTornada() {
		return tornada;
	}

	public void setTornada(List<Tornada> tornada) {
		this.tornada = tornada;
	}

	@Override
	public String toString() {
		return "Ruta [id=" + id + ", id_xofer=" + id_xofer + ", data_inici=" + data_inici + ", data_final=" + data_final
				+ ", anada=" + anada + ", avui_x_avui=" + avui_x_avui + ", tornada=" + tornada
				+ "]";
	}
	
}
