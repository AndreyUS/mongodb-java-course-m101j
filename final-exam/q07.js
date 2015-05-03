db.albums.createIndex({ "images": 1 });

var isImageInAnyAlbum = function(imageId) {
    return db.albums.find({ "images": imageId }).count() !== 0;
}

var deletedImagesCount = 0;

db.images.find().snapshot().forEach(function(image) {
    if (!isImageInAnyAlbum(image["_id"])) {
        deletedImagesCount++;
        db.images.remove({ "_id": image["_id"] });
    }
});

var remainingImages = db.images.count();
var remainingSunriseImages = db.images.find({ "tags": "sunrises" }).count();

print("Deleted images: " + deletedImagesCount);
print("Remaining images: " + remainingImages);
print("Remaining images tagged 'sunrises': " + remainingSunriseImages);
