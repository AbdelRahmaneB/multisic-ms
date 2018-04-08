package ca.polymtl.log8430.multisic.musicprovider.service.provider.deezer;

import ca.polymtl.log8430.multisic.model.domain.TrackModel;
import ca.polymtl.log8430.multisic.musicprovider.service.provider.TrackTransformer;

/**
 * class to transform Deezer Track to our own model Track model
 */
class DeezerTrackTransformer implements TrackTransformer<com.zeloon.deezer.domain.Track> {

	@Override
	public TrackModel transform(com.zeloon.deezer.domain.Track fromTrack) {
		TrackModel toTrack = new TrackModel()
			.name(fromTrack.getTitle())
			.artist(fromTrack.getArtist().getName())
			.album(fromTrack.getAlbum().getTitle())
			.previewurl(fromTrack.getPreview())
			.imagesurl(fromTrack.getAlbum().getCover());
		return toTrack;
	}
}
