package ca.polymtl.log8430.multisic.musicprovider.service.provider.spotify;

import ca.polymtl.log8430.multisic.model.domain.TrackModel;
import ca.polymtl.log8430.multisic.musicprovider.service.provider.TrackTransformer;
/**
 * class to transform Spotify Track to our own model Track model
 */
class SpotifyTrackTransformer implements TrackTransformer<com.wrapper.spotify.model_objects.specification.Track> {

	@Override
	public TrackModel transform(com.wrapper.spotify.model_objects.specification.Track fromTrack) {
		TrackModel toTrack = new TrackModel()
			.name(fromTrack.getName())
			.artist(fromTrack.getArtists()[0].getName())
			.album(fromTrack.getAlbum().getName())
			.previewurl(fromTrack.getPreviewUrl())
			.imagesurl(fromTrack.getAlbum().getImages()[0].getUrl());
		return toTrack;
	}
}
