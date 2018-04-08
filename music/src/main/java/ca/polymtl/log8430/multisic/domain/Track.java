package ca.polymtl.log8430.multisic.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import ca.polymtl.log8430.multisic.model.domain.TrackModel;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.util.HashSet;
import java.util.Set;

/**
 * A Track.
 */
@Entity
@Table(name = "track")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Track extends TrackModel{
    
	@JsonIgnore
    private Set<PlayList> playlists = new HashSet<>();

    @Id
    @Override
    public Long getId() {
    	return this.id;
    }
    
    @Column(name = "name")
    @Override
    public String getName() {
        return name;
    }

    @Column(name = "album")
    @Override
    public String getAlbum() {
        return album;
    }

    @Column(name = "artist")
    @Override
    public String getArtist() {
        return artist;
    }

    @Column(name = "imagesurl")
    @Override
    public String getImagesurl() {
        return imagesurl;
    }

    @Column(name = "previewurl")
    @Override
    public String getPreviewurl() {
        return previewurl;
    }

    @ManyToMany(cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.PERSIST })
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "play_list_track",
                inverseJoinColumns = @JoinColumn(name="play_lists_id", referencedColumnName="id"),
                joinColumns = @JoinColumn(name="tracks_id", referencedColumnName="id"))
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

}
