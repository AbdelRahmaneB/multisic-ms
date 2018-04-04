package ca.polymtl.log8430.multisic.service.musicprovider.deezer;

import ca.polymtl.log8430.multisic.domain.Track;
import ca.polymtl.log8430.multisic.service.musicprovider.TrackTransformer;

/**
 * class to transform Deezer Track to our own model Track model
 */
class DeezerTrackTransformer implements TrackTransformer<com.zeloon.deezer.domain.Track> {

	@Override
	public Track transform(com.zeloon.deezer.domain.Track fromTrack) {
		Track toTrack = new Track()
			.name(fromTrack.getTitle())
			.artist(fromTrack.getArtist().getName())
			.album(fromTrack.getAlbum().getTitle())
			.previewurl(fromTrack.getPreview())
			.imagesurl(fromTrack.getAlbum().getCover());
		return toTrack;
	}
}
