# Changelog

## `v[next]`

*Please collect changelog nodes here,
 these will be included in the changelog entry for the next release.

## `v1.0.0`

- Fixed an issue in TX processing where TX_FINAL was not fired,
 TX_SUCCESS was incorrect, and post-0-confirmation TX_RECEIPTS where ignored.
- TX status can now be 'pending': i.e. it has a receipt, 
 but the receipt doesn't tell the block-number, as it has not been mined yet.

## `v1.0.0`

Initial release.

