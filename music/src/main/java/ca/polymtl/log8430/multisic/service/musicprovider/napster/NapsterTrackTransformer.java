package ca.polymtl.log8430.multisic.service.musicprovider.napster;

import ca.polymtl.log8430.multisic.domain.Track;
import ca.polymtl.log8430.multisic.service.musicprovider.TrackTransformer;

/**
 * class to transform Napster Track to our own Track model
 */
class NapsterTrackTransformer implements TrackTransformer<com.github.kaiwinter.rhapsody.model.AlbumData.Track> {
	
	private static final String DEFAULT_IMG_URL = "http://images.all-free-download.com/images/graphiclarge/music_disk_sh_96910.jpg"; //$NON-NLS-1$

	@Override
	public Track transform(com.github.kaiwinter.rhapsody.model.AlbumData.Track fromTrack) {
		Track toTrack = new Track()
			.name(fromTrack.name)
			.artist(fromTrack.artist.name)
			.album(fromTrack.album.name)
			.previewurl(fromTrack.sample)
			.imagesurl(DEFAULT_IMG_URL);
		return toTrack;
	}
}
