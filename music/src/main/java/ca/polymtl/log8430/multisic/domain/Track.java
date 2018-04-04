package ca.polymtl.log8430.multisic.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.Objects;

/**
 * A Track.
 */
@Entity
@Table(name = "track")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Track implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "album")
    private String album;

    @Column(name = "artist")
    private String artist;

    @Column(name = "imagesurl")
    private String imagesurl;

    @Column(name = "previewurl")
    private String previewurl;

//    @ManyToMany(mappedBy = "tracks")
//    @JsonIgnore
//    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
//    private Set<PlayList> playlists = new HashSet<>();
    
    @ManyToMany(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.PERSIST })
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "play_list_track",
                inverseJoinColumns = @JoinColumn(name="play_lists_id", referencedColumnName="id"),
                joinColumns = @JoinColumn(name="tracks_id", referencedColumnName="id"))
    private Set<PlayList> playlists = new HashSet<>();
    
    public Track() {
        this.id = UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Track name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAlbum() {
        return album;
    }

    public Track album(String album) {
        this.album = album;
        return this;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public String getArtist() {
        return artist;
    }

    public Track artist(String artist) {
        this.artist = artist;
        return this;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public String getImagesurl() {
        return imagesurl;
    }

    public Track imagesurl(String imagesurl) {
        this.imagesurl = imagesurl;
        return this;
    }

    public void setImagesurl(String imagesurl) {
        this.imagesurl = imagesurl;
    }

    public String getPreviewurl() {
        return previewurl;
    }

    public Track previewurl(String previewurl) {
        this.previewurl = previewurl;
        return this;
    }

    public void setPreviewurl(String previewurl) {
        this.previewurl = previewurl;
    }

    public Set<PlayList> getPlaylists() {
        return playlists;
    }

    public Track playlists(Set<PlayList> playLists) {
        this.playlists = playLists;
        return this;
    }

    public Track addPlaylist(PlayList playList) {
        this.playlists.add(playList);
        playList.getTracks().add(this);
        return this;
    }

    public Track removePlaylist(PlayList playList) {
        this.playlists.remove(playList);
        playList.getTracks().remove(this);
        return this;
    }

    public void setPlaylists(Set<PlayList> playLists) {
        this.playlists = playLists;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Track track = (Track) o;
        if (track.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), track.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Track{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", album='" + getAlbum() + "'" +
            ", artist='" + getArtist() + "'" +
            ", imagesurl='" + getImagesurl() + "'" +
            ", previewurl='" + getPreviewurl() + "'" +
            "}";
    }
}
